import React from 'react'
import CreateEmployeer from './CreateEmployeer'

import '../styles/Employeer.css'

const EmployeerLoginPromo = () => {
    return (
        <div className='employeer-create'>
            <div className='employeer--promo'>
                <h1 className='employeer--promo-title'>Prom your company and hire best specialist</h1>
                <p className='employeer--promo-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum dignissim augue sit amet elementum. Morbi quis pharetra nisl, nec mollis sapien. Quisque non pulvinar leo. Ut ac tortor ut tortor tristique fermentum quis posuere lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In placerat neque ac sagittis volutpat. Etiam eget dignissim ex, in vulputate ex. Nunc pretium a dui vitae viverra. In cursus lacus et mauris auctor, et dapibus purus luctus. Quisque pharetra mi quis odio commodo, eu consequat felis ornare. Phasellus eget ullamcorper velit, in malesuada est. Nam placerat finibus egestas. Donec ac sem lorem.</p>
                <p className='employeer--promo-text'>Morbi volutpat erat orci, non semper turpis commodo quis. Nulla facilisi. Curabitur tincidunt purus quis dui sagittis, vitae consectetur lacus tempor. Integer pellentesque gravida eros, facilisis porttitor ligula volutpat sed. Ut sapien ipsum, porttitor vel odio eget, venenatis convallis magna. Quisque sit amet accumsan felis, id tristique sapien. Phasellus sed viverra metus, a ullamcorper ex.</p>
                <p className='employeer--promo-text'>Phasellus eget massa ac mauris fermentum semper eu at metus. Mauris lacinia erat urna, at blandit massa rhoncus non. Phasellus sem elit, iaculis sed purus vel, luctus gravida ipsum. Donec dui orci, ultrices consequat congue ut, mollis a ante. Quisque ac nunc lobortis ipsum sollicitudin commodo rutrum et diam. Etiam odio odio, consequat id libero eu, convallis suscipit ipsum. Mauris metus nisl, pellentesque sit amet molestie sed, rhoncus ut enim. </p>
            </div>


            <CreateEmployeer />
        </div>
    )
}

export default EmployeerLoginPromo