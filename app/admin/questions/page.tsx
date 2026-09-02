import {QuestionsManager} from "@/components/admin/questions-manager";
import {ProtectedPage} from "@/components/protected-page";
export default function AdminQuestionsPage(){return <ProtectedPage requiredRole="admin"><QuestionsManager/></ProtectedPage>}
