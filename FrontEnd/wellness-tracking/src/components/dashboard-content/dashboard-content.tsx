import { Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';
import './dashboard-content.scss';
export function DashboardContent() {
    const videos = [1, 2, 3, 4, 5, 6];
    return (
        <div className="dashboard-content-container">
            <div className="dashboard-header">
                Your Videos
            </div>
            <div className="video-tiles-container">
                {videos.map(card => <VideoTile  key={card} data={{id:card}} />)}
            </div>

        </div>
    )
}



function VideoTile(props:any) {
    return (
        <Card sx={{ minWidth: 300, margin: '20px 20px 20px 0', maxHeight: 200 }}>
            <CardActionArea>
                <CardMedia
                    height="140"
                    component="iframe"
                    image="https://www.youtube.com/embed/muuK4SpRR5M"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`TestVideo${props.data?.id}`}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}