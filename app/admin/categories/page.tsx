import {CategoriesManager} from "@/components/admin/categories-manager";
import {ProtectedPage} from "@/components/protected-page";
export default function AdminCategoriesPage(){return <ProtectedPage requiredRole="admin"><CategoriesManager/></ProtectedPage>}
