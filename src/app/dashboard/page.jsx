import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <div>
            {session ? <p>Dashboard</p> : <p>Please log in</p>}
            {session && <button>Sign out</button>}
        </div>
    )
}
