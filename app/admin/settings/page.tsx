import {SettingsManager} from "@/components/admin/settings-manager";
import {ProtectedPage} from "@/components/protected-page";
export default function AdminSettingsPage(){return <ProtectedPage requiredRole="admin"><SettingsManager/></ProtectedPage>}
