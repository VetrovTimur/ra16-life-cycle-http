import React, { useState } from 'react'
import AnalogClock from './AnalogClock';
import { FormClock } from './FormClock';

export const WorldClock = () => {
  let [listClock, setListClock] = useState([]);

  const putListClock = (name, timezone) => {
    if(listClock.length !== 0) {
      let arrFilter;
      let val = {name: '', timezone: 0}

      arrFilter = listClock.filter(arr => arr.name !== name);

      val.name = name;
      val.timezone = +(timezone)

      arrFilter.push(val);
      setListClock(listClock = [...arrFilter]);
    } else {
      setListClock([...listClock, {name: name, timezone: +(timezone)}]);
    }
  }

  const removeClock = (name) => {
    setListClock(listClock.filter(clock => clock.name!== name));
  }

  return (
    <div>
      <FormClock putListClock={putListClock}/>
      <h1>World Clock</h1>
      <AnalogClock listClock={listClock} removeClock={removeClock}/>
  </div>
  )
}
