import React from 'react';
import Product from './Product'
import axios from 'axios';
import '../allGroceries.css';

export default function AllGroceries(props){
    

    const [search,setSearch] = React.useState('');

    const [items, setItems] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1)
    const [postsPerPage, setPostsPerPage] = React.useState(20)

    // console.log(items)

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/item/')
            .then((res)=>{
                setItems(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[]);

    const lastItemIndex = currentPage*postsPerPage;
    const firstItemIndex = lastItemIndex - postsPerPage;
    const currentPosts = items.slice(firstItemIndex, lastItemIndex)

    let pages = [];
    for(let i = 1; i <= Math.ceil(items.length/postsPerPage); i++){
        pages.push(i)
    }
    
    return (
        <div className='allgroceries_Container'>
            <input 
                type='text' 
                className='allProductSearch' 
                placeholder='What are you looking for ?' 
                onChange={(e)=>{setSearch(e.target.value)}}
            />
            <div className='allgroceries'>
                {/* {data.filter((thing)=>{
                    return search.toLowerCase ===''? thing: thing.title.toLowerCase().includes(search)
                }).map((thing)=>{
                    return  <Product 
                                key={thing.id}
                                data = {thing}
                                counter = {props.counter}
                            />
                })} */}
                {currentPosts.filter((thing)=>{
                    return search.toLowerCase ===''? thing: thing.itemName.toLowerCase().includes(search)
                }).map((thing)=>{
                    return  <Product 
                                key={thing._id}
                                data = {thing}
                            />
                })}
                
            </div>
            {/* <div className='pagination'>
                {
                    pages.map((page,index) => {
                        return <button key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                    })
                }
            </div> */}
            <nav aria-label="Page navigation example" className='pagination'>
                <ul class="pagination justify-content-center">
                    {
                        pages.map((page,index) => {
                            return <li className="page-item" style={{cursor:'pointer'} }><a className={page== currentPage?"page-link activePage":"page-link inactivePage"} key={index} onClick={() => setCurrentPage(page)}>{page}</a></li>
                        })
                    }
                </ul>
            </nav>
        </div>
          
    )
}


