import sundayText from './assets/sundayText';
import {useState} from 'react';
import './App.css';
/**
 * Display the fixed top buttons
 */
const Header = ({eventDate, eventLecture})=>{
  return (
    <div className='header'>
      <div>
        <h1>Textes du dimanche</h1>
      </div>

      <form className="date-form" onSubmit={e=> e.preventDefault()}>

        <label htmlFor='date'>Choisissez une date: </label>
        <input type="date" id='date' onChange= {eventDate} />
      </form>

      <div className="button-group">
        <button className="btn" type="button" onClick={() => eventLecture('lecture1')}>Lecture 1</button>
        <button className="btn" type="button" onClick={() => eventLecture('lecture2')}>Lecture 2</button>
        <button className="btn" type="button" onClick={() => eventLecture('evangile')}>Evangile</button>
        <button className="btn" type="button" onClick={() => eventLecture('commentaire')}>Commentaire</button>
      </div>
    </div>
  )
}


function App() {
  
  const [error, setError] = useState('');

  const [firstLecture, setFirstLecture] = useState('');
  const [secondLecture, setSecondLecture] = useState('');
  const [evangile, setEvangile] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const [lecture, setLecture] = useState('');
  
  const [refLecture1, setRefLecture1] = useState('');
  const [refLecture2, setRefLecture2] = useState('');
  const [refEvangile, setRefEvangile] = useState('');
  const [refLecture, setRefLecture] = useState('');


  const handleDateChange = (date)=>{
    console.log(date);
    
    let dayText = sundayText.find(sunday=> sunday.date === date);

    if(dayText){
      setRefLecture1(dayText.references?.lecture1);
     setFirstLecture(dayText.lectures?.lecture1);

      setRefLecture2(dayText.references?.lecture2);
     setSecondLecture(dayText.lectures?.lecture2);
 
      setRefEvangile(dayText.references?.evangile);
     setEvangile(dayText.lectures?.evangile);

     setCommentaire(dayText.lectures?.commentaire);

     setLecture(dayText.lectures?.lecture1) ;
     setRefLecture(dayText.references?.lecture1);

     setError('');
    }else{
      setError('Ce texte n\'est pas disponible pour cette date');
      setFirstLecture('');
      setSecondLecture('');
      setEvangile('');
      setCommentaire(''); 
      setLecture('');
      setRefLecture1('');
      setRefLecture2('');
      setRefEvangile('');
      setRefLecture('');
    }

  } 

  return (
    <div className='main-part'>
      <Header eventDate={(e)=> handleDateChange(e.target.value)} 
      eventLecture={(val)=>{
       if(val === 'lecture1'){

        setLecture(firstLecture);
        setRefLecture(refLecture1)

       }else if(val === 'lecture2'){
        setLecture(secondLecture);
        setRefLecture(refLecture2)

       }else if(val === 'evangile'){
        setLecture(evangile);
        setRefLecture(refEvangile)

       }else if(val === 'commentaire'){
        setLecture(commentaire);
        setRefLecture('')
       }
        
      }}/>

        <div className="content">
          {refLecture && <p className="reference-text">Références: <strong> {refLecture} </strong></p>}

          <p className="lecture-text">{lecture}</p>

          {error && <p className="error-text">{error}</p>}
        </div>
    </div>

  )
}

export default App
