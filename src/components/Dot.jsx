import React from 'react'

const Dot = ({onClick,isSelected}) =>
                <i
                className= { isSelected ? 'fa fa-dot-circle-o dotActive'
                            : 'fa fa-dot-circle-o'
                             }
                onClick = {onClick}

                 aria-hidden='true'>

                 </i>
export default Dot
