import React from 'react'
import Header from '@components/element/navigation'
import Footer from '@components/element/footer'

export default function defaultLayout(props) {
    return (
        <>
            <Header breadcumb={props.breadcumb}/>
                {props.children}
            <Footer/>  
        </>
    )
}
