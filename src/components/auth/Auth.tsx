import React from 'react'

export const Auth = () => {
    return (
        <>
            <div>
                <form>
                    <input type="text" placeholder="email" />
                    <input type="password" placeholder="password"/>
                    <input type="password" placeholder="confirm password"/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}
