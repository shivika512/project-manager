import { prisma } from "@/lib/prisma";

function getUser(req: Request) {
  return JSON.parse(req.headers.get("user") || "null");
}

export async function POST(req: Request) {
  const user = getUser(req);

  if (user?.role !== "ADMIN") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const task = await prisma.task.create({
    data: {
      title: body.title,
      assignedTo: body.assignedTo,
    },
  });

  return Response.json(task);
}

export async function GET(req: Request) {
  const user = getUser(req);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ADMIN → all tasks
  if (user.role === "ADMIN") {
    return Response.json(await prisma.task.findMany());
  }

  // MEMBER → only assigned tasks
  return Response.json(
    await prisma.task.findMany({
      where: { assignedTo: user.email },
    })
  );
}

{user?.role === "ADMIN" && (
  <div>
    <h2>Create Task</h2>

    <input
      placeholder="Task title"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
    />

    <input
      placeholder="Assign to"
      value={assignedTo}
      onChange={(e) => setAssignedTo(e.target.value)}
    />

    <button onClick={createTask}>Create</button>
  </div>
)}

<h2>Tasks</h2>

{tasks.map((t) => (
  <div key={t.id}>
    <b>{t.title}</b> - {t.status}

    <button onClick={() => updateStatus(t.id)}>
      Mark Done
    </button>
  </div>
))}

