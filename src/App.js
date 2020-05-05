import React from 'react';
import ZingChart from 'zingchart-react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
   this.state={
      pdata:[],
      search:'',
      
    
      }
  }
 
  componentDidMount(){
    this.getdata()
  }
  getdata=()=>{
    fetch("https://api.covid19api.com/summary")
    .then(res=> res.json())
    .then(result=>{
      console.log(result)
     this.setState({
        pdata:result.Countries
      })
      
    }) 
    .catch((error)=>{
      console.log(error)
    })
    
  }
  change=(event)=>{
    this.setState({
      search:event.target.value
    })

  }
 
  render(){
   
  const filteredCountries = this.state.pdata.filter(country => {
      return country.Country.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });

    return(
      <div className="App">
        <h1>Search Any Country To track Latest update Of Covid19</h1><br></br><br></br>
        <div className="searchbar">
          <input type="text" value={this.state.search} onChange={this.change}></input>
         
           
      </div> 
      {this.state.search ? 
    filteredCountries.map((res)=> 
        <div className="box">
        <h2>{res.Country}</h2>
        <p><spam>NewConfirmed</spam>:{res.NewConfirmed}</p>
        <p><spam>TotalConfirmed</spam>:{res.TotalConfirmed }</p>
        <p><spam>NewDeaths</spam>:{res.NewDeaths}</p>
        <p><spam>TotalDeaths</spam>:{res.TotalDeaths}</p>
        <p><spam>NewRecovered</spam>:{res.NewRecovered }</p>
        <p><spam>TotalRecovered</spam>:{res.TotalRecovered}</p>
      
            </div>     
                )
      : null}    
       
           

      </div>
    )
  }
}

export default App;
