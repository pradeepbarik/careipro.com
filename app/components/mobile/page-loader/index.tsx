const PageSkeleton = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: "10px 10px",
            borderRadius: '8px',
        }}>
            <div style={{
                height: '4rem',
                width: '100%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div className="flex gap-2 justify-between">
                <div style={{
                    height: '4rem',
                    width: '6rem',
                    background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                    borderRadius: '1rem',
                    animation: 'skeleton-loading 3s infinite'
                }} />
                <div style={{
                    height: '4rem',
                    width: '6rem',
                    background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                    borderRadius: '1rem',
                    animation: 'skeleton-loading 3s infinite'
                }} />
                <div style={{
                    height: '4rem',
                    width: '6rem',
                    background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                    borderRadius: '1rem',
                    animation: 'skeleton-loading 3s infinite'
                }} />
            </div>
            <div style={{
                height: '2rem',
                width: '100%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '80%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '80%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '80%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '30px',
                width: '100%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '80%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '80%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '80%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <style>
                {`
                    @keyframes skeleton-loading {
                        0% {
                            background-position: -200px 0;
                        }
                        100% {
                            background-position: calc(200px + 100%) 0;
                        }
                    }
                    div[style*="animation: skeleton-loading"] {
                        background-size: 200px 100%;
                    }
                `}
            </style>
        </div>
    );
}
export default PageSkeleton;