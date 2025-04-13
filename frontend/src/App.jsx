function App() {
  return (
    <>
      <p className="text-semibold text-lg italic text-red-700 p-4">
        App Running...<br />

        <strong className="text-blue-700">Follow these guidelines...</strong>
        <ul>
          <li>1. Add a folder called pages under src folder</li>
          <li>2. Add a folder called auth under pages</li>
          <li>3. Make Pages under auth as Login.jsx, Signup.jsx etc. [src/pages/auth/Login.jsx]</li>
          <li>4. Same for Landing... src/pages/landing/Landing.jsx & Searching... src/pages/search/SearchGroups.jsx..etc.</li>
          <li>5. For styles & CSS, try to use Tailwind..jaisa maine kiya hain under "className" of this &lt;p&gt; & &lt;strong&gt; tags (ChatGPT se help le le). Aur agar nhi hota toh normal CSS hi krle..kya kr sakte hain :(</li>
        </ul>
      </p>
    </>
  )
}

export default App
