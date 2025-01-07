export function MenuLogo({ toggleMenu }) {
    return (
        <svg onClick={toggleMenu} className="md:hidden" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" /></svg>
    )
}