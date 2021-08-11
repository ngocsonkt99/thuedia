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
const DashBoard = () => {
    const context = useContext(GlobalContext)
    const [disks] = context.diskApi.disks
    const [customers] = context.customerApi.customer
    const [filterCus, setFilterCus] = useState({})
    const [filterDisk, setFilterDisk] = useState([])
    const [phieuthue] = context.phieuthueApi.phieuthue
    const [callback, setcallback] = context.phieuthueApi.callback
    const [callbackCus, setcallbackCus] = context.customerApi.callback
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
    const TotalItem = 5;
    const PostVisited = numberPage * TotalItem

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


        try {

            const res = await axios.post('/phieuthue/add', { ...thongTin })


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




            alert(res.data.msg)
            setcallback(!callback)
            setcallbackCus(!callbackCus)
            settotalDisk([])
            setPhiTre(0)
            setFilterCus([])
            setFilterDisk([])
            setIsPhiTre(false)
        } catch (err) {
            alert(err.response.data.msg)
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
    const disPlayTable = phieuThueAll.slice(PostVisited, PostVisited + TotalItem).map((item, i) => (
        <>
            {

                <tr key={i}>
                    <th scope="row">{i}</th>

                    <td>{item.customer.name}</td>

                    <td>{new Date(item.ngayLap).toLocaleDateString()}</td>
                    <td>{new Date(item.hanTra).toLocaleDateString()}</td>
                    <td>{item.total}</td>
                    <td style={item.status.type ? { color: 'red' } : { color: 'green' }}>{item.status.msg}</td>
                    <td onClick={() => handleView(item.id)}><GrView /></td>
                    <td>
                        {
                            item.status.type ?

                                <button style={{
                                    borderRadius: '2px',

                                    margin: 'auto',
                                    display: 'flex',


                                    padding: '5px'
                                }}
                                    onClick={() => handleShowTraDia(item.id)}
                                >Trả đĩa</button> :


                                <button style={{
                                    borderRadius: '2px',

                                    margin: 'auto',
                                    display: 'flex',


                                    padding: '5px'
                                }}
                                
                                onClick={()=>deletePhieuThue(item.id)}>Xóa phiếu</button>

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
        <>
            <h4 style={{
                textAlign: 'center',
                background: '#ccc',
                letterSpacing: '1px',
                textTransform: 'capitalize'
            }}>Phiếu thuê</h4>
         
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
                    }}>Lập phiếu thuê</button>
                       <div>
                <img src='sync-alt-solid.svg' alt='' style={{
                    width:'15px',
                    marginTop: '50px'
                }} onClick={()=>setcallback(!callback)}/>
            </div>
                <PaginationReact
                    previousLabel={"Trở lại"}
                    nextLabel={"Tiếp theo"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationPosts"}
                    previousLinkClassName={"previousBtn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActivePosts"}

                />
                <div className='search'>
                    <input placeholder='Id khách hàng' style={{ marginTop: '30px', width: '300px ' }} value={inputSearch} onChange={handleOnchangeInputSearch} />
                    <button onClick={() => onClickSearch(inputSearch)} style={{ marginLeft: '10px' }}>Tìm</button>
                </div>
              
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr className='table-primary'>
                        <th scope='col'>STT</th>
                        <th scope="col">Tên KH</th>

                        <th scope="col">Ngày lập</th>
                        <th scope="col">Hạn trả</th>
                        <th scope="col">Tổng phí</th>
                        <th scope="col">Trạng thái</th>
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

        </>
    )
}

export default DashBoard
