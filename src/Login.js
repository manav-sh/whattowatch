import React from 'react'

export const Login = () => {

    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit Called");
        if( email === "" || password === "") {
            setError(true);
        } else {
            setError(false);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300">
  <div className="bg-white p-6 rounded shadow-2xl sm:w-2/3 max-w-lg min-w-min sm:p-7 w-full mx-3 sm:mx-0 my-2">
    <h2 className="font-bold text-xl sm:text-[25px] text-center mb-8 text-gray-800">Create your free Account</h2>
    {error && <div className="bg-red-200 p-2 text-red-600 text-[13px] rounded-md mb-2"><i className="fa fa-exclamation-triangle mr-2" aria-hidden="true"></i>Error! Name / Email / Password can not be empty</div>}
    <form className="space-y-5" onSubmit={(e) => {handleSubmit(e)}}>
      <div className="space-y-2">
        <label htmlFor="email" className="block font-semibold text-gray-700">Name</label>
        <input id="text" type="text" className="py-3 px-4 border border-gray-200 rounded-lg w-full text-sm outline-none" onChange={(e) => {setName(e.target.value)}}/>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
        <input id="email" type="email" className="py-3 px-4 border border-gray-200 rounded-lg w-full text-sm outline-none" onChange={(e) => {setEmail(e.target.value)}} />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
        <input id="password" type="password" className="p-3 border border-gray-200 rounded-lg w-full outline-none" onChange={(e) => {setPassword(e.target.value)}} />
      </div>
      <button type="submit" className="content-center bg-red-600 font-bold py-2 w-full rounded mt-6 hover:bg-red-700 text-gray-200">Get Started</button>
    </form>
    <div className="my-4 flex items-center justify-center space-between">
      <hr className="border border-gray-200 w-2/5"/>
      <span className="w-1/5 text-center text-gray-600">or</span>
      <hr className="border border-gray-200 w-2/5"/>
    </div>
    <button className="block w-full p-2 border border-gray-400 rounded font-semibold hover:bg-gray-100 hover:font-bold"><i className="fa fa-google" aria-hidden="true"></i> &nbsp;Sign Up With Google</button>
    <p className="mt-4 font-semibold text-center">Already a User? <span className="text-red-600 font-bold hover:underline hover:decoration-red-600 cursor-pointer">Log In</span></p>
  </div>
</div>
  )
}
