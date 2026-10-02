'use server';

import { and, eq, desc, sql, getTableColumns } from 'drizzle-orm';
import { ensureDb } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';

async function runQuery(operation, query) {
  try {
    return await query();
  } catch (error) {
    console.error(`Database error while attempting to ${operation}.`, {
      errorName: error?.name || 'UnknownError',
      causeCode: error?.cause?.code
    });
    throw new Error(
      `Unable to ${operation}. Check your Neon database connection and try again.`,
      { cause: error }
    );
  }
}

export async function getUserBudgets(email) {
  if (!email) {
    return [];
  }

  const db = ensureDb();
  return runQuery('load budgets', () =>
    db.select().from(Budgets).where(eq(Budgets.createdBy, email))
  );
}

export async function createBudget({ name, amount, icon, createdBy }) {
  if (!createdBy) {
    throw new Error('createdBy is required to create a budget');
  }

  const db = ensureDb();
  const result = await runQuery('create budget', () =>
    db
      .insert(Budgets)
      .values({
        name,
        amount: String(amount),
        icon,
        createdBy
      })
      .returning({ id: Budgets.id })
  );

  return result;
}

export async function getBudgetList(email) {
  if (!email) {
    return [];
  }

  const db = ensureDb();
  const result = await runQuery('load budgets', () =>
    db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`cast(coalesce(sum(${Expenses.amount}), 0) as numeric)`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number)
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, email))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))
  );

  return result;
}

export async function getBudgetInfo(budgetId, email) {
  const db = ensureDb();
  const result = await runQuery('load budget details', () =>
    db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`cast(coalesce(sum(${Expenses.amount}), 0) as numeric)`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number)
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, email))
      .groupBy(Budgets.id)
  );

  return result?.find((item) => item.id === Number(budgetId));
}

export async function addExpense({ name, amount, budgetId }) {
  const db = ensureDb();
  const result = await runQuery('add expense', () =>
    db
      .insert(Expenses)
      .values({
        name,
        amount: Number(amount),
        budgetId,
        createdAt: new Date().toISOString()
      })
      .returning({ id: Expenses.id })
  );

  return result;
}

export async function getExpensesList(budgetId) {
  if (!budgetId) {
    return [];
  }

  const db = ensureDb();
  return runQuery('load expenses', () =>
    db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, budgetId))
      .orderBy(desc(Expenses.id))
  );
}

export async function getAllExpensesList(email) {
  if (!email) {
    return [];
  }

  const db = ensureDb();
  return runQuery('load expenses', () =>
    db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        budgetId: Expenses.budgetId
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, email))
      .orderBy(desc(Expenses.id))
  );
}

export async function deleteExpense(expenseId) {
  const db = ensureDb();
  return runQuery('delete expense', () =>
    db.delete(Expenses).where(eq(Expenses.id, expenseId)).returning()
  );
}

export async function deleteBudget(budgetId) {
  if (!Number.isInteger(budgetId) || budgetId <= 0) {
    throw new Error('A valid budget ID is required.');
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    throw new Error('You must be signed in to delete a budget.');
  }

  const db = ensureDb();
  const [budget] = await runQuery('verify budget ownership', () =>
    db
      .select({ id: Budgets.id })
      .from(Budgets)
      .where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, email)))
      .limit(1)
  );

  if (!budget) {
    throw new Error('Budget not found or you do not have permission to delete it.');
  }

  await runQuery('delete budget expenses', () =>
    db.delete(Expenses).where(eq(Expenses.budgetId, budgetId))
  );
  const deleted = await runQuery('delete budget', () =>
    db
      .delete(Budgets)
      .where(and(eq(Budgets.id, budgetId), eq(Budgets.createdBy, email)))
      .returning({ id: Budgets.id })
  );

  if (deleted.length === 0) {
    throw new Error('The budget could not be deleted. Please try again.');
  }

  return deleted[0];
}
