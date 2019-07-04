/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
function turnHoursToMinutes (array){
  let newArray = array.map((movieContent)=>{
    let newMovieContent = {...movieContent};

    let hour = movieContent.duration.match(/[0-9]h/g);
    let min = movieContent.duration.match(/[0-9]+min/g);
    if(hour === null){
      hour = 0;
    }else{
      hour = parseInt(hour) * 60;
    }
    if(min === null){
      min = 0;
    }else{
      min = parseInt(min)
    }
    newMovieContent.duration = hour + min;
    return newMovieContent;
  });
  return newArray;  
}
turnHoursToMinutes(movies);
// Get the average of all rates with 2 decimals 
function ratesAverage(array){
  let floatArray = array.map((eachMovie) => {
    if (!eachMovie.rate){
      return 0;
    } else {
    return parseFloat(eachMovie.rate);
    }    
  });
  let averageArray = floatArray.reduce((accumulator,currentValue) =>{
    return accumulator + currentValue;
  });
  return parseFloat((averageArray/floatArray.length).toFixed(2));
}

// Get the average of Drama Movies
function dramaMoviesRate(array){
  let dramaArray = array.filter((movie)=>{
    return movie.genre.includes("Drama")
  });
  if (dramaArray.length < 1){
    return undefined;
  } else {
  return ratesAverage(dramaArray);
  }
}

let dramaAverage = dramaMoviesRate(movies);

function orderByDuration(array){
    array.sort((a, b) => {      
      if (a.duration < b.duration){
          return -1;
      }
      if (a.duration > b.duration){
          return 1;
      }else if(a.title < b.title){
        return -1;
      }if (a.title > b.title){
        return 1;
      }
      return 0;
  });
 return array;
}
// How many movies did STEVEN SPIELBERG
function howManyMovies(array){
  if (array.length === 0){
    return;
  } else {
  let directorSpielberg = array.filter((eachMovie) => {    
    return eachMovie.director === 'Steven Spielberg' && eachMovie.genre.includes("Drama");    
  });   
    return `Steven Spielberg directed ${directorSpielberg.length} drama movies!`;
}
  
}

// Order by title and print the first 20 titles
function orderAlphabetically(array){
  let sortedArray = [...array];  
  sortedArray.sort((a,b) => {
    if (a.title < b.title){
      return -1;
    } if (a.title > b.title){
      return 1;
    }
    return 0;
  });
  let titleArray = [];
  for(let i = 0; i < 20; i++){
      if(sortedArray[i]){
      titleArray[i] = sortedArray[i].title;
      } else{
        break;
      }
    }
  return titleArray;
}


// Best yearly rate average
function bestYearAvg(movArr){
  
  //object to store rate information per year
  let movieCollection = {};
  let numberOfMoviesPerYear = {}
  
    
  movArr.forEach(eachMovie => {
    let eachMovieYear = eachMovie.year;
    let eachMovieRate = Number(eachMovie.rate);
    
    if (eachMovieYear in movieCollection){      
      movieCollection[eachMovieYear] = Number(Number(movieCollection[eachMovieYear]) + eachMovieRate).toFixed(1);
      numberOfMoviesPerYear[eachMovieYear] = Number(numberOfMoviesPerYear[eachMovieYear]) + 1;      
    } else {
      movieCollection[eachMovieYear] = eachMovieRate;
      numberOfMoviesPerYear[eachMovieYear] = 1;      
    }
  });

  let bestAverage = 0;
  let bestYear = '';
  
  movArr.forEach(eachMovie => {
    let eachMovieYear = eachMovie.year;
    let thisAverage;
    let thisYear;
    
    
    if (eachMovieYear in movieCollection){      
      thisAverage = Number(movieCollection[eachMovieYear]/numberOfMoviesPerYear[eachMovieYear]).toFixed(1);
      thisYear = eachMovieYear;
    }

    if (thisAverage > bestAverage){
        bestAverage = thisAverage;
        bestYear = thisYear;
      }
      
    
  });
  

  // console.log(movieCollection);
  // console.log(numberOfMoviesPerYear);
  // console.log(ratesPerYear);
  let answer = `The best year was ${bestYear} with an average rate of ${bestAverage}`;

if (movArr.length === 0){
  return undefined;
} else {
  return answer;
}

}