import React, { useEffect, useState } from 'react'
import axios from 'axios'

function MyUrls() {
    const [urls, setUrls] = useState([]);

    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === name) {
                return cookie[1];
            }
        }
        return null;
    }

    useEffect(() => {
        const token = getCookie("token")
        axios.get("http://localhost:4000/getUrls", { headers: { "token": token } })
            .then((res) => { 
                if(res.data.status=="success"){
                    setUrls(res.data.data)
                }
             })
    }, [])

    const copyUrl = (custom)=>{
        window.navigator.clipboard.writeText(`http://localhost:5173/${custom}`)
        alert("URL Copied")
    }

    return (
        <div className='w-auto height  bg-gray-900 flex justify-center text-white' >
            <div>
                {urls.length==0 ? (
                    <h1>Please Login first</h1>
                ) : (
                    <table >
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Complete Url</th>
                                <th>Short Url</th>
                                <th>Copy Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(urls).map((e, ind) =>
                                <tr key={ind}>
                                    <td className='w-4'>{ind + 1}</td>
                                    <td>{e.mainUrl}</td>
                                    <td>{`http://localhost:5173/${e.shorturl}`}</td>
                                    <td className='w-4 '><button onClick={()=>{copyUrl(e.shorturl)}} className='bg-blue-500 px-4 py-2 rounded-lg'>Copy</button></td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                )}
            </div>

        </div>
    )
}

export default MyUrls