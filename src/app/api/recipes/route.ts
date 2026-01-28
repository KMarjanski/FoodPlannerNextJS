import { NextResponse } from "next/server";
import dbConnect from "@core/db/connection";
import Recipes from "@features/recipes/model";

export async function GET() {
  await dbConnect();
  const recipes = await Recipes.find();
  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const recipe = await Recipes.create(data);
  return NextResponse.json(recipe);
}

export async function PUT(request: Request) {
  await dbConnect();
  const data = await request.json();
  const recipe = await Recipes.findOneAndUpdate({ name: data.name }, data, { new: true });
  return NextResponse.json(recipe);
}

export async function DELETE(request: Request) {
  await dbConnect();
  const data = await request.json();
  await Recipes.deleteOne({ name: data.name });
  return NextResponse.json({ success: true });
}
