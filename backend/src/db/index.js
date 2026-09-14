import crypto from 'node:crypto';

const submissions = [];

export async function connectDb() {
  return { ok: true, provider: 'memory' };
}

export async function saveSubmission(submission) {
  const record = {
    id: crypto.randomUUID(),
    ...submission,
    createdAt: new Date().toISOString(),
  };
  submissions.push(record);
  return record;
}
