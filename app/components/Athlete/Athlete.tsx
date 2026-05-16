import type { StravaActivity, StravaAthlete } from "~/types/strava";

const Athlete = ({
  athlete,
  activities,
}: {
  athlete: StravaAthlete;
  activities: StravaActivity[];
}) => {
  const name = athlete.firstname + " " + athlete.lastname;
  const activityTypes = [...new Set(activities.map((activity) => activity.type))];
  console.log(activityTypes);

  return (
    <div className='border rounded-lg w-auto px-2.5 py-1 flex flex-col gap-3'>
      <h2 className='text-xl underline underline-offset-2'>Athlete details</h2>
      <div className='flex gap-5'>
        <div id='col1'>
          <img src={athlete.profile} alt={`Profile picture for ${name}`} className='w-full' />
          <div>Name: {name}</div>
          <div>Gender: {athlete.sex === "M" ? "Male" : "Female"}</div>
        </div>
        <div id='col2' className='grow'>
          <div>
            <div>Total exercises: {activities.length}</div>
            <ul className='grid grid-cols-[auto_1fr] gap-x-5 gap-y-2'>
              {activityTypes.map((activityType) => {
                const count = activities.filter(
                  (activity) => activity.type === activityType,
                ).length;
                const percentage = (count / activities.length) * 100;
                return (
                  <li className='contents'>
                    <div>
                      {activityType}: {count} (
                      {Number((count / activities.length) * 100).toFixed(2)}
                      %)
                    </div>
                    <div className='w-full'>
                      <div
                        style={{ width: `${percentage}%` }}
                        className='h-full bg-cyan-400'></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Athlete;

/* {
    "id": 16219621,
    "username": null,
    "resource_state": 3,
    "firstname": "Mike",
    "lastname": "Francis",
    "bio": null,
    "city": null,
    "state": null,
    "country": null,
    "sex": "M",
    "premium": false,
    "summit": false,
    "created_at": "2016-07-08T22:32:06Z",
    "updated_at": "2026-04-28T10:42:42Z",
    "badge_type_id": 0,
    "weight": 80.06,
    "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/16219621/10771672/1/medium.jpg",
    "profile": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/16219621/10771672/1/large.jpg",
    "friend": null,
    "follower": null,
    "blocked": false,
    "can_follow": true,
    "follower_count": 38,
    "friend_count": 32,
    "mutual_friend_count": 0,
    "athlete_type": 1,
    "date_preference": "%m/%d/%Y",
    "measurement_preference": "feet",
    "clubs": [
        {
            "id": 231407,
            "resource_state": 2,
            "name": "The Strava Club",
            "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5319085/1/medium.jpg",
            "profile": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5319085/1/large.jpg",
            "cover_photo": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5098428/25/large.jpg",
            "cover_photo_small": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5098428/25/small.jpg",
            "activity_types": [],
            "activity_types_icon": "sports_multi_normal",
            "dimensions": [
                "moving_time",
                "num_activities",
                "distance",
                "elev_gain"
            ],
            "sport_type": "other",
            "localized_sport_type": "Multisport",
            "city": "San Francisco",
            "state": "California",
            "country": "United States",
            "private": false,
            "member_count": 0,
            "featured": false,
            "verified": true,
            "url": "strava",
            "membership": "member",
            "admin": false,
            "owner": false
        },
        {
            "id": 81417,
            "resource_state": 2,
            "name": "Brooks Running",
            "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/81417/31064968/3/medium.jpg",
            "profile": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/81417/31064968/3/large.jpg",
            "cover_photo": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/81417/5137349/89/large.jpg",
            "cover_photo_small": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/81417/5137349/89/small.jpg",
            "activity_types": [
                "Run",
                "VirtualRun",
                "Wheelchair"
            ],
            "activity_types_icon": "sports_run_normal",
            "dimensions": [
                "distance",
                "num_activities",
                "best_activities_distance",
                "elev_gain",
                "moving_time",
                "velocity"
            ],
            "sport_type": "running",
            "localized_sport_type": "Running",
            "city": "Seattle",
            "state": "Washington",
            "country": "United States",
            "private": false,
            "member_count": 0,
            "featured": false,
            "verified": true,
            "url": "brooksrunning",
            "membership": "member",
            "admin": false,
            "owner": false
        },
        {
            "id": 332379,
            "resource_state": 2,
            "name": "Runderwear",
            "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/332379/25277705/2/medium.jpg",
            "profile": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/332379/25277705/2/large.jpg",
            "cover_photo": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/332379/7855515/20/large.jpg",
            "cover_photo_small": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/332379/7855515/20/small.jpg",
            "activity_types": [
                "Run",
                "VirtualRun",
                "Wheelchair"
            ],
            "activity_types_icon": "sports_run_normal",
            "dimensions": [
                "distance",
                "num_activities",
                "best_activities_distance",
                "elev_gain",
                "moving_time",
                "velocity"
            ],
            "sport_type": "running",
            "localized_sport_type": "Running",
            "city": "Poole",
            "state": "Dorset",
            "country": "United Kingdom",
            "private": false,
            "member_count": 0,
            "featured": false,
            "verified": true,
            "url": "Runderwear",
            "membership": "member",
            "admin": false,
            "owner": false
        },
        {
            "id": 581470,
            "resource_state": 2,
            "name": "Strava UK",
            "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/581470/13524258/7/medium.jpg",
            "profile": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/581470/13524258/7/large.jpg",
            "cover_photo": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/581470/13522725/31/large.jpg",
            "cover_photo_small": "https://dgalywyr863hv.cloudfront.net/pictures/clubs/581470/13522725/31/small.jpg",
            "activity_types": [],
            "activity_types_icon": "sports_multi_normal",
            "dimensions": [
                "moving_time",
                "num_activities",
                "distance",
                "elev_gain"
            ],
            "sport_type": "other",
            "localized_sport_type": "Multisport",
            "city": "",
            "state": "",
            "country": "United Kingdom",
            "private": false,
            "member_count": 0,
            "featured": false,
            "verified": true,
            "url": "strava-uk",
            "membership": "member",
            "admin": false,
            "owner": false
        }
    ],
    "postable_clubs_count": 0,
    "ftp": null,
    "bikes": [],
    "shoes": [
        {
            "id": "g25321863",
            "primary": false,
            "name": "HOBIBEAR Unisex Wide",
            "nickname": null,
            "resource_state": 2,
            "retired": false,
            "distance": 4282,
            "converted_distance": 2.7
        },
        {
            "id": "g29102206",
            "primary": false,
            "name": "Vivobarefoot Walking boots",
            "nickname": null,
            "resource_state": 2,
            "retired": false,
            "distance": 0,
            "converted_distance": 0
        },
        {
            "id": "g4178933",
            "primary": false,
            "name": "Brooks Adrenaline GTS 19",
            "nickname": "",
            "resource_state": 2,
            "retired": false,
            "distance": 897662,
            "converted_distance": 557.8
        },
        {
            "id": "g4423036",
            "primary": false,
            "name": "Hi-Tec Otter Trail",
            "nickname": "",
            "resource_state": 2,
            "retired": false,
            "distance": 42424,
            "converted_distance": 26.4
        },
        {
            "id": "g4524297",
            "primary": false,
            "name": "Converse ALL STAR",
            "nickname": "",
            "resource_state": 2,
            "retired": false,
            "distance": 47753,
            "converted_distance": 29.7
        }
    ]
} */
