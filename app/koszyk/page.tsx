



import { AppLayout } from "@/components/meal-planner/app-layout"
import { fetchMasterIngredients } from "@/lib/recipes-data-service"
import { CartView } from "@/components/cart/cart-view"

export default async function KoszykPage() {
  const ingredients = await fetchMasterIngredients();
  return (
    <AppLayout>
      <CartView ingredients={ingredients} />
    </AppLayout>
  )
}
