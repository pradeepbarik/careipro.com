export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <PageSkeleton/>
}
function PageSkeleton() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '32px',
            maxWidth: '600px',
            margin: '40px auto',
            background: '#f3f3f3',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
            <div style={{
                height: '32px',
                width: '60%',
                background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                borderRadius: '4px',
                animation: 'skeleton-loading 1.2s infinite'
            }} />
            <div style={{
                height: '20px',
                width: '90%',
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