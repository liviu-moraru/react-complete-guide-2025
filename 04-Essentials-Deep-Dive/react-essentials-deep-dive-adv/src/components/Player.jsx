import { useState } from 'react';

export default function Player({ name, symbol }) {
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick() {
        // setIsEditing(!isEditing);
        // setIsEditing(!isEditing);

        setIsEditing(prevState => !prevState);
        //setIsEditing(prevState => !prevState);

    }

    let playerName = <span className="player-name">{name}</span>;

    if (isEditing) {
        playerName = <input type="text" required value={name}/>;
    }

    let btnCaption = isEditing ? 'Save' : 'Edit';

    return (
        <li>
      <span className="player">
        {playerName}
          <span className="player-symbol">{symbol}</span>
      </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    );
}