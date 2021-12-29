import { Nav } from "./Nav"

export default function Layout ({children}:any) {
    return (
        <div className="bg-yellow min-h-screen">
            <div>
                <h1 className="font-baloo text-3xl text-center p-5">Random Recipe Wrangler!</h1>
            </div>
            <button className="icon font-lobster text-white text-xl bg-pink border-3 border-navy rounded-full w-8 h-8 align-text-top absolute top-5 right-20">i</button>
           <Nav/>
            {children}
        </div>
    )
}