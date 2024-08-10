import { useState } from 'react';

export const FormClock = (props) => {
    const [name, setName] = useState('');
    const [timeZone, setTimeZone] = useState(0);

    const handleTimeZoneChange = (e) => {
        const value = e.target.value;

        if (value === 0 || (value >= -12 && value <= 14)) {
            setTimeZone(value);
        }
    };

  return (
     <form 
        onSubmit={e => {
            e.preventDefault();
            props.putListClock(name, timeZone);
            setName("");
            setTimeZone(0);
        }}>

      <div>
        <label htmlFor="name">Название:</label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
      </div>
      <div>
        <label htmlFor="timeZone">Временная зона: UTC</label>
        <input
            type="number" 
            id="timeZone"
            value={timeZone}
            onChange={handleTimeZoneChange}
            min="-12" 
            max="14"  
            required
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  )
}
