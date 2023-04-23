import { signIn, signOut, useSession} from "next-auth/react";


export const Navbar = () => {

    const { data: sessionData} = useSession();

    return(
    <div className="navbar bg-base-200">
      <div className="flex-1 pl-5 text-2xl font-bold">
        {sessionData?.user?.name ? `Codebook - for ${sessionData.user.name}` : "Codebook - Save your code by logging in!" }
      </div>
      <div>
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost rounded-btn btn"
              onClick={() => void signOut()}
            >
                Sign out
            </label>
          ) : 
          (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
    );

};