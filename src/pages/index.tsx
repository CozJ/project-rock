import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { PromptLogin } from "@/components/auth/promptLogin";
import Link from "next/link";
import { ClimbingRoutes } from "@prisma/client";

export default function Home() {
  const { data: session } = useSession();

  
  if (session) {
    
    const userRoutes = api.climbingRoutes.getUserRoutes.useQuery();

    if (userRoutes.isLoading) return <div>Loading...</div>;

    if (userRoutes.error) return <div>Error: {userRoutes.error.message}</div>;

    return (
      <>
        <div className="m-2 p-2">
          <h1 className="m-4 py-2 text-2xl font-bold">
            Welcome to Project-Rock, {session.user?.name}
          </h1>
          <table className="text-bold m-4 w-1/2 border-b-2 p-8 text-left">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Grade</th>
                <th>Style</th>
                <th/>
                <th/>
              </tr>
            </thead>
            <tbody>
              {userRoutes.data?.map((route: ClimbingRoutes) => (
                <tr key={route.id}>
                  <td>{route.name}</td>
                  <td>{route.description}</td>
                  <td>{route.grade}</td>
                  <td>{route.style}</td>
                  <td>
                    <button className="bg-red-600 text-white">
                      delete
                    </button>
                  </td>
                  <td>
                    <button className="bg-green-600 text-white">
                      view
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href={"/newRoute"}>
            <div className="m-4 my-8 max-h-fit max-w-fit rounded-md bg-blue-400 p-2 px-4 font-semibold">
              Add New Route
            </div>
          </Link>
        </div>
      </>
    );
  }
  return (
    <PromptLogin />
  );
}
