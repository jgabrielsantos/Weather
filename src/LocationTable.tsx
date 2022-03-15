import React, {FC} from 'react'

interface LocationTableProps {
    locations: string[]
}

const LocationTable: FC<LocationTableProps> = ({locations}) => {
    return (
        <div>
            <h2>Locations</h2>
            <table className='table table-hover'>
                <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                    {locations.map((location, index) => <tr key={index}><td>{location}</td></tr>)}
                </tbody>
            </table>
      </div>
    )
}

export default LocationTable