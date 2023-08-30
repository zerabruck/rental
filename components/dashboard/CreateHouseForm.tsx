import React from 'react'
import Dropdown from '../common/Dropdown'

const CreateHouseForm = () => {
  return (
    <div>
        <p>property details</p>
        <form>
            <div>
            <label>
                Name
            </label>
            <input type='text' />
            </div>
            <div>
            <label>
                Address
            </label>
            <input type='text' />
            </div>
            <div>
                <label>
                    Description
                </label>
                <textarea className='bg-orange-500'></textarea>
            </div>
            <div>
                <label>
                    Pictures
                </label>
                <input type='file' />
            </div>
            <div>
                <label>
                    House Component
                </label>
                <input type='text' placeholder='Number of bedrooms' />
                <input type='text' placeholder='Number of bathrooms' />
                <input type='text' placeholder='Property size' />
            </div>
            <div>
                <label>
                    House Type
                </label>
                <Dropdown/>
            </div>
            <div>
                <p>Want To</p>
                <div>
                <input type="checkbox" />
                <label>
                    Sell
                </label>
                </div>
                <div>
                <input type="checkbox" />
                <label>
                    Rent
                </label>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CreateHouseForm