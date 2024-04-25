import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';

export const Home = () => {
  const uri = 'http://localhost:8080';

  const [expenses,setExpenses]=useState([]);
  const [amount,setAmount]=useState('');
  const [description,setDescription]=useState('');
  const [categories,setCategories]=useState(['Food','Entertainment','Education','Health','Lend','Transport','Others']);
  const [selectedCategory,setSelectedCategory]=useState(categories[0]);

  const cookies = new Cookies();

  const navigate = useNavigate();
  
  async function getData(){
    try {
      await axios.get(`${uri}/expenses`)
      .then(dataa=>setExpenses(dataa.data));
      console.log(expenses);
    } catch (error) { 
      console.log(error)
    } 
    
}


  async function handleAddExpense(id){
    try {
      await axios.post(`${uri}/add`,{
        "amount":amount,
        "description":description,
        "category":selectedCategory
      });
      getData();
      setAmount('');
      setDescription('');
      showTaskSuccess();
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteExpense(e){
    const taskid=e.target.id;
    console.log(e.target.id)
    try {
      await axios.delete(`${uri}/delete/${taskid}`);
      getData();
      showTaskFailure();
    } catch (error) {
      console.log(error)
    }

  }

  // Notifications
  const showTaskSuccess = () => {
    toast.success("Expense Added !");
  };
  const showTaskFailure = () => {
    toast.error("Expense Deleted!");
  };




  
  useEffect(()=>{
    if(!cookies.get("expense")){
      navigate('/login')
    };
    getData();
  },[])
  return (
    <div className='bg-gray-900 h-screen w-full flex   text-white  flex-col py-14 px-10'>
        <ToastContainer/>
        <div className="flex justify-center  justify-between">

          {/* add expense */}
          <div className='flex flex-col  w-1/4 text-sm'>

            <div className='flex flex-col my-2'>
              <label htmlFor="amount">Enter Amount</label>
              <input type="number" name="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} className="p-2 rounded-lg text-black "/>
            </div>

            <div className='flex flex-col my-2'>
              <label htmlFor="description">Description</label>
              <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="p-2 rounded-lg text-black "/>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="categories">Select Category For Expense</label>
              <select name="categories" id="categoreis" className='p-2 text-black rounded-lg' onChange={(e)=> setSelectedCategory(e.target.value)} >
                {
                  categories.map(category=>{
                    return (
                      <option value={category} key={category} className='text-black'>
                        {category}
                      </option>
                    )
                  })
                }
              </select>
            </div>
            <button className='bg-green-700 p-3 rounded-lg font-mono px-4 w-fit  mt-4' onClick={handleAddExpense}>Add Expense</button>
          </div>

          {/* show expenses */}
          <div className="flex flex-col w-full pl-10 items-center pt-6">
          <p className='text-2xl my-2 font-semibold text-gray-300'>You'r Expense</p>
          {
            Array.isArray(expenses)
            ?
              expenses.map(expense=>{
                return(
                  <div className="flex justify-between w-1/2 my-1" key={expense.id}>
                    <div className='w-1/3'>
                      <p className="text-xl capitalize">{ expense.description}</p>
                      <p className='text-xs'>{expense.category  }</p>
                    </div>
                    <div className='flex items-end'>
                      <p className='mr-2'>&#8377;{expense.amount } </p>
                      <button onClick={deleteExpense} id={expense.id} className=' text-xl hover:cursor-pointer'>
                      🗑️
                      </button>
                    </div>
                  </div>
                )
              })
            :
            console.log("not array")
          }
        </div>
        </div>
        
        
    </div>  
  )
}