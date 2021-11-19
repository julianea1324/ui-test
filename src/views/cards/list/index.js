import React from 'react'
import './index.scss'
export const List = ({setType}) => {
    return (
        <section id="list">
            <select onChange={(e)=>setType(e.target.value)}>
                <option value="list">
                    List
                </option>
                <option value="grid">
                    Grid
                </option>
            </select>
        </section>
    )
}
