'use client'

import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { use } from 'bcrypt/promises'




function Navbar() {
  

    const isUserLoggedIn = true;
    const [providers, setProvoiders] = useState(null)
    const [Toggle, setToggle] = useState(false)
        
    useEffect(() =>{
        const setProvoiders = async () => {
            const response = await getProviders()
            setProvoiders(response)
        }
    }, [])


  return (
    <nav className='w-full flex-between mb-16 pt-3'>
    <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src='/assets/images/logo.svg'
        alt='logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Promptify</p>

    </Link>

    {/*Desktop Navigation */}
    <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
            <div className='flex
            gap-3
            md:gap-5'>
                <Link href="/creat-prompt" className='black_btn'>
                    Create-Post
                </Link>
                <button type='button' className='outline_btn' onClick={signOut}>Sign Out</button>
                <Link href='/proflie' >
                    <Image 
                    src='/assets/images/logo.svg'
                    className='rounded-full'
                    alt='profle'
                    width={35}
                    height={35}
                    />
                </Link>

            </div>
        ) : (
            <>
            {providers &&
            Object.values(providers).map((provider)=> (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
                className='black_btn'>
                    Sign In
                </button>
            ))
            }

            </>
        )}

    </div>

    {/* Mobile navigation */}
    <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
            <div className='flex'>
                <Image 
                    src='/assets/images/logo.svg'
                    className='rounded-full'
                    alt='profle'
                    width={35}
                    height={35}
                    onClick={() => setToggle((prev) => !prev)}
                    />
                    {Toggle && (
                        <div className='dropdown'>
                            <Link href="/profile"
                            className='dropdown_link'                   
                            onClick={() => setToggle(false)}>
                                Create Prompt
                            </Link>
                           
                            <Link href="/profile"
                            className='dropdown_link'                   
                            onClick={() => setToggle(false)}>
                                My Profile
                            </Link>
                            <button
                            type='button'
                            className='mt-5 w-full black_btn'
                            onClick={() => {
                                setToggle(false)
                                signOut()

                            }}>Sign Out</button>
                            </div>

                    )}
            </div>

        ):(
            <>
            {providers &&
            Object.values(providers).map((provider)=> (
                <button type='button' key={provider.name} onClick={() => signIn(provider.id)}
                className='black_btn'>
                    Sign In
                </button>
            ))
            }

            </>

        )}

    </div>
    </nav>

  )
}

export default Navbar