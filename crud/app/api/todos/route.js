import { NextResponse } from "next/server";
import { todos, updateTodos } from "./todo";


export async function GET() {
  return NextResponse.json(
    {
      message: "Getting all todos",
      todos,
    },
    { status: 202 }
  );
}


export async function POST(request) {
  const data = await request.json();
  updateTodos([
    ...todos,
    {
      title: data.title,
      id: Date.now(),
    },
  ]);
  console.log(data);
  return NextResponse.json({
    message: "Todo added successfully",
    todos,
  });
}


export async function PUT(request) {
  const data = await request.json();
  const { id, title } = data;
  

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex !== -1) {
    todos[todoIndex].title = title;
    updateTodos(todos);
    return NextResponse.json({
      message: "Todo updated successfully",
      todos,
    });
  }

  return NextResponse.json({
    message: "Todo not found",
  }, { status: 404 });
}

export async function DELETE(request) {
  const { id } = await request.json();

  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1); 
    updateTodos(todos);
    return NextResponse.json({
      message: "Todo deleted successfully",
      todos,
    });
  }
  

  return NextResponse.json({
    message: "Todo not found",
  }, { status: 404 });
}
