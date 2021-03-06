import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import ChiTietThue from './ChiTietThue'
import './dashboard.css'
import PhieuThue from './PhieuThue'
import { GrView } from 'react-icons/gr'
import { } from 'react-icons/'
import TraDia from './TraDia'
import Report from './Report'
import PaginationReact from 'react-paginate'
import Loading from '../until/Loading'
const DashBoard = () => {
    const context = useContext(GlobalContext)
    const [disks] = context.diskApi.disks
    const [customers] = context.customerApi.customer
    const [filterCus, setFilterCus] = useState({})
    const [filterDisk, setFilterDisk] = useState([])
    const [phieuthue] = context.phieuthueApi.phieuthue
    const [callback, setcallback] = context.phieuthueApi.callback
    const [callbackCus, setcallbackCus] = context.customerApi.callback
    const [callbackDisk,setCallBackDisk]=context.diskApi.callback
    const [totaldisk, settotalDisk] = useState([])
    const [hanTra, setHanTra] = useState('')
    const [dia, setDia] = useState([])
    const [phiTre, setPhiTre] = useState(0)
    const [ObId, setObId] = useState([])
    const [isphitrem, setIsPhiTre] = useState(false)
    const [rp, setRp] = useState([])
    const [isRp, setIsRp] = useState(false)
    const [isTraDia, setIsTraDia] = useState(false)
    const [isNew] = useState(false)
    const [numberPage, setNumberPage] = useState(0)
    const [loading,setLoading]=useState(false)
    const [isNewThue,setIsNewThue]=useState(false)
    const [phieuThueAll, setPhieuThueAll] = useState([
        {
            id: '',
            customer: '',

            ngayLap: '',
            hanTra: '',
            total: 0,
            status: ''
        }
    ])

    const [_idDisk,setIdDisk]=useState([])
    const TotalItem = 5;
    const PostVisited = numberPage * TotalItem
    const[newThue,setNewThue]=useState({
        total: 0,
        ngayTra: ''
    }
)
    const [inputSearch, setInputSearch] = useState('')
    const handleOnchangeInputSearch = (e) => {
        setInputSearch(e.target.value)
    }
    const onClickSearch = (value) => {
        //  console.log(value)

        if (value !== '') {
            const data = []
            phieuthue.forEach(element => {

                if (element.customer.customerId === value) {
                    data.push(
                        {
                            id: element._id,
                            customer: element.customer,

                            ngayLap: element.ngayLap,
                            hanTra: element.hanTra,
                            total: element.total,
                            status: element.status
                        }
                    )

                }
            });
            setPhieuThueAll(data)
        } else setcallback(!callback)


    }
    const [themPhiTre, setThemPhiTre] = useState({
        _id: "",
        phiTre: 0
    })
    const [thongTin, setThongTin] = useState({
        customer: "",
        disk: [],
        hanTra: "",
        phiTre: 0
    })





    useEffect(() => {
        if (filterCus) setThemPhiTre({
            _id: filterCus._id,
            phiTre: phiTre
        })
    }, [filterCus, phiTre])

    useEffect(() => {
        if (filterCus && filterDisk) {
            setThongTin({
                customer: filterCus.customerId,
                disk: ObId,
                hanTra: hanTra,
                phiTre: phiTre

            })
        }

    }, [filterDisk, filterCus, ObId, hanTra, phiTre])
    const handleThemPhieuThu = async () => {

        setLoading(true)
        try {

           const res = await axios.post('/phieuthue/add', { ...thongTin })
           await axios.patch('/disk/update_thue',{disk :_idDisk})

            if (isphitrem) {
                setThemPhiTre({
                    _id: filterCus._id,
                    phiTre: 0
                })
                await axios.patch('/customer/themPhiTre', {_id: filterCus._id,phiTre:0 })
            }
            else {
                setThemPhiTre({
                    _id: filterCus._id,
                    phiTre: filterCus.phiTre
                })
                await axios.patch('/customer/themPhiTre', {  _id: filterCus._id,
                    phiTre: filterCus.phiTre })
            }

         setNewThue({
             total: res.data.newPhieuThue.total,
             ngayTra:res.data.newPhieuThue.hanTra
         })

            setLoading(false)
          //  alert(res.data.msg)
          setIsNewThue(true)
          setCallBackDisk(!callbackDisk)
            setcallback(!callback)
            setcallbackCus(!callbackCus)
            settotalDisk([])
            setPhiTre(0)
            setFilterCus([])
            setFilterDisk([])
            setHanTra()
            setIsPhiTre(false)
            setDia([])

        } catch (err) {
            alert(err.response.data.msg)
            setLoading(false)
        }

    }


    const handleThanhToanPhiTre = () => {
        setPhiTre(filterCus.phiTre)
        setIsPhiTre(!isphitrem)
        setThemPhiTre({
            _id: filterCus._id,
            phiTre: phiTre
        })
    }
    useEffect(() => {
        const thue = [];

        let dia = '';
        phieuthue.forEach(p => {
            disks.forEach(ds => {
                if (ds._id === p.disk) dia = ds.title
            });

            thue.push({
                id: p._id,
                customer: p.customer,
                disk: dia,
                ngayLap: p.ngayLap,
                hanTra: p.hanTra,
                total: p.total,
                status: p.status
            })

        });
        setPhieuThueAll(thue)
    }, [phieuthue, disks])



    const handleOnchangeHantra = e => {
        setHanTra(e.target.value)
    }
    const filterCustomer = (id) => {
        if (customers) {
            customers.forEach(cus => {
                if (cus.customerId === id) setFilterCus(cus)

            });

        }

    }
    const data = []
    const filterDiskHandle = (id) => {


        if (disks) {

            disks.forEach(ds => {
                if (ds.diskId === id) {

                    setFilterDisk(ds)

                    data.push(ds._id)
                    settotalDisk([...totaldisk, filterDisk._id])
                    setObId([...ObId, id])
                    setDia([...dia, ds])
                    setIdDisk([..._idDisk,ds._id])
                }
            });


        }

    }



    const [showPhiTre, setShowPhiTre] = useState([])
    const handleShowTraDia = (id) => {
        setIsTraDia(!isTraDia)

        phieuthue.forEach(element => {
            if (element._id === id) setShowPhiTre(element)
        });
    }

    const handleView = (id) => {
        setIsRp(!isRp)
        phieuthue.forEach(element => {
            if (element._id === id) setRp(element)
        });
    }
    const close = () => { setIsRp(false) }
    const deletePhieuThue= async(id)=>{
        try {
            const res=await axios.delete(`/phieuthue/${id}`)
            alert(res.data.msg)
            setcallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const disPlayTable = phieuThueAll.slice(PostVisited, PostVisited + TotalItem).map((item,i) => (
        <>
            {

                <tr key={item.id}>
                    <th scope="row">{i}</th>

                    <td>{item.customer.name}</td>

                    <td>{new Date(item.ngayLap).toLocaleDateString()}</td>
                    <td>{new Date(item.hanTra).toLocaleDateString()}</td>
                    <td>{item.total}</td>
                    <td style={item.status.type ? { color: 'red',fontWeight: 'bold' } : { color: 'green',fontWeight: 'bold'  }}>{item.status.msg}</td>
                    <td onClick={() => handleView(item.id)}><GrView style={{
                      fontSize: '25px',
                      
                    }} /></td>
                    <td>
                        {
                            item.status.type ?

                                <button className='btn-disk' style={{
                                    borderRadius: '2px',

                                    margin: 'auto',
                                    display: 'flex',
                                    background: 'none',
                                    border: '1px solid #aaa',

                                    padding: '5px'
                                }}
                                    onClick={() => handleShowTraDia(item.id)}
                                >Tr??? ????a</button> :


                                <button className='btn-disk' style={{
                                    borderRadius: '2px',

                                    margin: 'auto',
                                    display: 'flex',
                                    background: 'none',
                                    border: '1px solid #aaa',

                                    padding: '5px',
                                
                                }}
                                
                                onClick={()=>deletePhieuThue(item.id)}>X??a phi???u</button>

                        }

                    </td>
                </tr>

            }
        </>
    ))
    const pageCount = Math.ceil(phieuThueAll.length / TotalItem);
    const changePage = ({ selected }) => {
        setNumberPage(selected)
    }
    return (
        <div className='page-main'>
            <h4 style={{
                textAlign: 'center',
                background: '#cccc',
                letterSpacing: '1px',
                textTransform: 'capitalize'
            }}>Phi???u thu??</h4>
         
            <div className='dashboard'>

                <PhieuThue filterCus={filterCustomer} customer={filterCus} isPhiTre={isphitrem} handleThanhToanPhiTre={handleThanhToanPhiTre} />
                <ChiTietThue filterDiskHandle={filterDiskHandle} filterDisk={filterDisk} hanTra={hanTra} handleOnchangeHantra
                    ={handleOnchangeHantra} dia={dia} />
            </div>

            <div className='pagination-dashboard'>
                <button
                    onClick={() => handleThemPhieuThu()}
                    style={{
                        margin: '10px',
                        width: '200px',
                        outline: 'none',
                        border: '1px solid #aaa',


                        borderRadius: '3px',
                        color: 'black',
                        fontWeight: 'bold'
                    }}>L???p phi???u thu??</button>
                       <div>
                <img src='sync-alt-solid.svg' alt='' style={{
                    width:'15px',
                    marginTop: '50px'
                }} onClick={()=>setcallback(!callback)}/>
            </div>
                <PaginationReact
                    previousLabel={"Tr??? l???i"}
                    nextLabel={"Ti???p theo"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationPosts"}
                    previousLinkClassName={"previousBtn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActivePosts"}

                />
                <div className='search'>
                    <input placeholder='Id kh??ch h??ng' style={{ marginTop: '30px', width: '300px ',border: '1px solid #aaa',outline: 'none' }} value={inputSearch} onChange={handleOnchangeInputSearch} />
                    <button onClick={() => onClickSearch(inputSearch)} style={{ marginLeft: '10px',border: '1px solid #aaa',borderRadius: '3px',width: '70px' }}>T??m</button>
                </div>
              
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr className='table-primary'>
                        <th scope='col'>STT</th>
                        <th scope="col">T??n KH</th>

                        <th scope="col">Ng??y l???p</th>
                        <th scope="col">H???n tr???</th>
                        <th scope="col">T???ng ph??</th>
                        <th scope="col">Tr???ng th??i</th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {disPlayTable}


                </tbody>
            </table>
            {
                isTraDia ? <TraDia show={handleShowTraDia} phiTre={showPhiTre} /> : ''
            }
            {isRp ? <Report rp={rp} close={close} isNew={isNew} /> : ''}
            {loading ? 
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '55%'
            }}>
                <Loading/>
            </div>    
            : ''
        }
        {
            isNewThue ?
        
        <div  style={{
            position: 'absolute',
            top: '30%',
            left:'40%',
            background: '#aaa',
            width: '40%',
            height: '150px',
            padding:'10px'
        }}>
            <h4 style={{
                color: 'red',
                textAlign: 'center'
            }}>Th??m th??nh c??ng</h4>
            <h5>T???ng ti???n : {newThue.total} </h5>
            <h5>Ng??y tr??? : {new Date(newThue.ngayTra).toLocaleDateString()}</h5>
            <button style={{width: '100%'}} onClick={()=>setIsNewThue(false)}>Ho??n t???t</button>
        </div> : ''}
        </div>
    )
}

export default DashBoard
