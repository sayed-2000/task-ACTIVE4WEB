import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BiSolidBox, BiSolidShow , BiSolidPencil, BiExport} from "react-icons/bi";
import { CSVLink } from 'react-csv';
import {MoonLoader} from 'react-spinners'

function Tale() {

    const [data,setData] = useState([]);
    const [dataExcel,setDataExcel] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
              const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2024-06-01&sortBy=publishedAt&apiKey=5ff01d85bba84cfb84feecdec7c6f22b');
              // const articles = response.data.articles.slice(0,10);
              const articles = response.data.articles;
              setData(articles);

              const modifiedArticles = articles.map(({ source,url,urlToImage, ...new1 }) => new1);
              setDataExcel(modifiedArticles);
              console.log(modifiedArticles);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };

          getData()
    },[])

  return (
    <>
        <div className="container">
            {data.length > 0 ? (
            <>
            <div className="top">
                <CSVLink data={dataExcel} filename="userData.XLS">
                    <button className='add'><BiExport/></button>
                </CSVLink>
            </div>

              <div className='main'> 
                  <div className='itme'>
                      <p className="itme__creat">#</p>
                      <p className="itme__name">الاسم</p>
                      <p className="action">الخيارات</p>
                  </div>

              {data.length > 0 ? data.map((itme,index) => (
                    <div className='itme' key={index}>
                          <p className="itme__name">{index}</p>
                          <p className="itme__creat">{itme.author}</p>
                          <div className="itme__action">
                                  <button><BiSolidShow/></button>
                                  <button > <BiSolidPencil/></button>
                                  <button > <BiSolidBox /></button>
                          </div>
                  </div>
            )):null}
              </div>

              <div className='main__s'> 
                  {data.length > 0 ? data.map((itme,index) => (
              <>
                <div className='parent' key={index}>
                          <div className='itme'>
                              <p className="itme__creat">#</p>
                              <p className="itme__name">الاسم</p>
                        </div>

                        <div className='itme'>
                              <p className="itme__name">{index}</p>
                              <p className="itme__creat">{itme.author}</p>
                        </div>
                      <div className="itme__action">
                          <button><BiSolidShow/></button>
                          <button > <BiSolidPencil/></button>
                          <button > <BiSolidBox /></button>
                      </div>
                </div>
            </>   
          )):null}
              </div>
            </>
            ):<div className='spinners'><MoonLoader /></div>

            }
            
    </div>
    </>
  )
}

export default Tale
