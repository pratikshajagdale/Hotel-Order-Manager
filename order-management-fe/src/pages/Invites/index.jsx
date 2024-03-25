import "../../assets/styles/invite.css";

function Invites() {
    return (
        <>
            <div className="position-relative">
                <div style={{
                    height: '120px', background: 'linear-gradient( #49AC60, #08182D)',
                }}>
                    <h4 className="text-center text-white pt-5">Invite Admin</h4>
                </div>
                <div className="position-absolute top-100 start-50 translate-middle"

                    style={{
                        border: '2px #49AC60 solid', borderRadius: '100px',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15)'
                    }}>
                    <input type="text" placeholder="test@test.com" className="py-3 px-5 border-0 email-input" style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }} />
                    <button className="py-3 px-4 border-0" style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px', background: '#49AC60', color: 'white' }}>Send</button>
                </div>
            </div>
        </>
    )
}

export default Invites
