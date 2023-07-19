import React,{useState , useEffect} from 'react'
import Food from '../FinalData'
import './Frontview.css'
import { TimeAndMoney , TimeAndDiet,MoneyandDiet} from '../Filter'
const Frontview = () => {
  const [array, setArray] = useState([]);
  var newnumber = [];
  useEffect(() => {
    Food()
      .then((data) => {
        setArray(Array.from(data));
        console.log("data array", array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log("Random Number ",randomNumber)
  //const dataarray;

  newnumber = array.map((item) => {
    return item;
  }); 
  console.log("Fronnt" , newnumber)
  const [popupcontent,setPopupcontent]= useState([]);
   const[popuptogle,setPopuptogle]=useState(false);
   const changedcontent=(food)=>{
    setPopupcontent([food]);
    setPopuptogle(!popuptogle);
    
        if(styling===null){
       setStyling ({position:'fixed'})
    }
    else{
        setStyling(null);
    };

   };
   
   const[styling,setStyling]=useState(null);

  return (
    <div className="app_container">
   <div className="content_container" style={styling}>
  {TimeAndMoney && TimeAndMoney.length ? (
    Food.map((food) => {
      return (
        <div className="content_card" key={food.id}>
          <img src={`../images/${food.img}`} alt="" />
          <p>{TimeAndMoney.Diet}</p> {/* Assuming 'Diet' property is in 'food' object */}
          <p>{TimeAndMoney.RecipeName}</p> {/* Assuming 'RecipeName' property is in 'food' object */}
          <button onClick={() => changedcontent(food)}>Details</button>
        </div>
      );
    })
  ) : (
    <p>No data available</p>
  )}
</div>
      {popuptogle&&
      (<div className='pop_up_container' onClick={changedcontent}>
        <div className='pop_up_body' onClick={(e)=>e.stopPropagation()}>
        <div className='pop_up_header'>
            <button onClick={changedcontent}>xx</button>
        </div>
        <div className='pop_up_content'>
        {popupcontent.map((pop)=>{
            return ( 
                <div className='pop_up_card'>
                    <p>name: {pop.name}</p>
                    <p> details: {pop.details}</p>
                    </div>
            )
        })}
        </div>
        </div>
      </div>
      )}
    </div>
  )
}

export  {Frontview}