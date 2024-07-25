import { Outlet } from "react-router-dom"
import UserProfile from "../components/common/UserProfile"
import { user } from "../types/user"

interface MainLayoutProps {
    user?: user | null,
    onLogout?: () => void
}

const MainLayout: React.FC<MainLayoutProps> = ({ user, onLogout }) => {
    return (
        <div className="flex flex-col h-screen max-h-screen">
            {user && (
                <div className={`flex flex-col`}>
                    <div className="w-full bg-white h-[93px] border-b flex items-center justify-between p-6 shadow-sm">
                        <div className="text-[32px] leading-[48px] font-semibold">
                            
                        </div>
                        <div className="flex items-center space-x-4">
                            <UserProfile name={user?.name} email={user?.email} />
                            <button
                                onClick={onLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-full">
                {<Outlet /> && <Outlet /> }
            </div>
        </div>
    )
}

export default MainLayout