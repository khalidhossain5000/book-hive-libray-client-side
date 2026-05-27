import Navbar from "@/components/shared/Navbar/Navbar";

export default function MainLayout({ children }) {
  return <div lang="en">
     <header className='sticky top-0 z-99999999'>
            <Navbar/>
        </header> 
    
   <main>
     {children}
   </main>
    
    
    </div>;
}
