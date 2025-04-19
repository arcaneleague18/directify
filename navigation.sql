CREATE DATABASE navigation;

CREATE TABLE places (
    id SERIAL PRIMARY KEY,
    location TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    sector TEXT,
    description TEXT,
    image_url TEXT -- Added column for image URLs
);

INSERT INTO places (location, latitude, longitude, sector, description, image_url) VALUES
('CSE Block', 17.492986998276265, 78.39240384034574, 'Departments', 'Department of computer science engineering having advanced computing labs with seminar halls', 'images/cse_block.jpg'),
('CSE Backgate', 17.49346205176763, 78.3921814706765, 'Departments', 'Department of computer science engineering back entrance adjacent to college library', 'images/cse_backgate.jpg'),
('ECE block', 17.493887552863995, 78.3927150808898, 'Departments', 'Department of electronical and communication engineering located centrally having digital system labs', 'images/ece_block.png'),
('EEE block', 17.494953115351617, 78.39124085996745, 'Departments', 'Department of electrical engineering adjacent to mechanical block having electrical machinery labs', 'images/eee_block.jpg'),
('Mechanical Block', 17.494440155025863, 78.39123638549405, 'Departments', 'Deparment of mechanical engineering having thermal labs, machine shops etc', 'images/mechanical_block.png'),
('Civil Block', 17.495100977621387, 78.39055776215825, 'Departments', 'Department of civil engineering having surveying labs, material testing labs etc', 'images/civil_block.png'),
('Metallurgy Block', 17.49577107231448, 78.39206159006855, 'Departments', 'Department of metallury and chemical engineering and having material testing labs', 'images/metallurgy_block.jpg'),
('University Library', 17.495545783834636, 78.3909961302176, 'Libraries', 'Central library of the college avaiable for studying and access to computers', 'images/university_library.jpg'),
('CRC', 17.493285051968652, 78.39128500354029, 'Others', 'Classroom complex for newly joined first year students comprising all the branches', 'images/CRC.png'),
('Canteen', 17.494344937500575, 78.39278717900594, 'Others', 'JNTUH Canteen for students located centrally comprising of fastfood and tiffins', 'images/canteen.jpg'),
('Golden Jubilee', 17.493562593702443, 78.390321884797, 'Others', 'Golden Jubileee Building contructed newly for the 50 years anniversary of the college', 'images/golden_jubilee.png'),
('Ground', 17.492500698009664, 78.39033469465062, 'Sports', 'Sports ground for students for playing cricket and football', 'images/ground.avif'),
('international boys hostel', 17.490283116694457, 78.38929865360288, 'Hostels', 'International boys hostel for international students and NRIs', 'images/international_boys_hostel.jpg'),
('Gowthami hostel', 17.492073096071067, 78.38923163696886, 'Hostels', 'Gowthami boys hostel adjacent to krishna hostel for senior boys', 'images/gowthami_hostel.png'),
('Krishna hostel', 17.491378951401888, 78.38902889954753, 'Hostels', 'Krishna boys hostel adjacent to gowthami hostel for senior and junior boys', 'images/krishna_hostel.png'),
('Manjeera hostel', 17.490845568101456, 78.38816522824952, 'Hostels', 'Manjeera boys hostel for senior and junior boys', 'images/manjeera_hostel.png'),
('Kinnera hostel', 17.490411749538158, 78.38850877301782, 'Hostels', 'Kinnera boys hostel for senior and junior boys', 'images/kinnera_hostel.png'),
('girls hostel', 17.49517579886927, 78.39393929619007, 'Hostels', 'Girls hostel allocated to all the girls of the college', 'images/girls_hostel.png'),
('union bank', 17.495851167824103, 78.39449326482776, 'Banks', 'Union Bank at JNTUH is an on-campus branch offering comprehensive banking services to students, faculty', 'images/union_bank.png'),
('sbi bank', 17.49397582519155, 78.39350964012529, 'Banks', 'SBI at JNTUH provides convenient and full-fledged banking services for students, faculty, and university staff', 'images/sbi_bank.png'),
('Jntu auditorium', 17.491942837600362, 78.39178609979825, 'Others', 'JNTU auditorium for events and fests conducted and for seminars', 'images/jntu_auditorium.png'),
('Indoor stadium', 17.491242361996683, 78.39079905630655, 'Sports', 'Indoor stadium for students with various sport facilities and swimming pool', 'images/indoor_stadium.jpg'),
('SIT building', 17.495413348378683, 78.39286983728704, 'Others', 'SIT building controls the adminstrative part of the college and isses documents', 'images/sit_building.png'),
('Science block', 17.494517396129833, 78.39250916595246, 'Others', 'Science block known as the spandana block contains the phsyics and chemistry department with respective labs', 'images/science_block.png'),
('Main building', 17.49443035216393, 78.39185479913357, 'Student Service', 'Main building for admissions for freshers and documents verification', 'images/main_building.jpg'),
('JNTUH Administrative Building', 17.496611745080763, 78.3925059169676, 'Others', 'Controls the adminstrative part of the college', 'images/jntuh_administrative_building.png'),
('Nehru statue', 17.496462298797486, 78.39290867314773, 'Others', 'Nehru statue is located near the adminstrative building which is a tribute to the college name', 'images/nehru_statue.png'),
('Examination Branch', 17.49593696057449, 78.39235591365474, 'Student Service', 'Examination branch adjacent to metallurgy block for certificates and other requiements', 'images/examination_branch.png'),
('College library', 17.4930976700241, 78.39167826246515, 'Libraries', 'College library adjacent to cse back gate available to tudents for studying and borrowing books', 'images/college_library.png'),
('UGC(hr&management)', 17.496066631907944, 78.39357653105073, 'Student Service', 'Human resource and management centre and school of management studies', 'images/UGC.jpg'),
('Fire station', 17.491424794340286, 78.39129575703335, 'Others', 'Fire station ensures the safety incase of any emergency accidents', 'images/fire_station.png'),
('Health center', 17.49164735663635, 78.39110397908027, 'Others', 'Health care centre provides first aid and health support in case of any minor emergency', 'images/health_center.png'),
('JTBI', 17.49355133633618, 78.39301007328413, 'Others', 'JTBI opposite to ece contains the placement cell and technical workshops hosted', 'images/jtbi.png'),
('Parking (main gate)', 17.496207274570132, 78.39431411472653, 'Others', 'Main parking adjacent to entrance for both 2 wheelers and 4 wheelers', 'images/parking_main_gate.jpg'),
('Parking (cse)', 17.492923007815897, 78.39234277373824, 'Others', 'Parking near the cse block entrance for the faculty and students', 'images/parking_cse.jpg'),
('Temple', 17.49315719158572, 78.39261546672782, 'Others', 'Temple adjacent to the cse entrance - OM NAMASHIVAYA!', 'images/temple.jpg'),
('Post office', 17.493260046108905, 78.3925915486282, 'Others', 'Post office adjacent to the ece block', 'images/post_office.png'),
('Basketball court', 17.491077758681232, 78.39049979574399, 'Sports', 'Basketball court for students and intra and inter college tournaments', 'images/basketball_court.jpg'), -- Added suffix to avoid duplicate
('Tennis court', 17.491104177120885, 78.39029449618255, 'Sports', 'Tennis court for students and intra and inter college tournaments', 'images/tennis_court.jpg'),
('Guest House', 17.49582769815368, 78.39410362087153, 'Others', 'Guest house for residence of special guests or any vips', 'images/guest_house.jpg'),
('JNTUH Admissions block', 17.493658552449656, 78.39312512600559, 'Student Service', 'Admission block for the students of the college', 'images/jntuh_admissions_block.png'),
('Cafeteria', 17.49407849783272, 78.39200899608586, 'Others', 'Cafeteria for students to sit and have a breather from the busy classrooms', 'images/cafeteria.jpg'),
('Entrance', 17.49611269020954, 78.39487558851643, 'Others', 'Enter the beautiful campus of Jawaharlal Nehru Technological University', 'images/entrance.jpg'),
('Jntuh staff quarters', 17.490830369370798, 78.392013194071, 'Others', 'Residence of the faculty or staff of JNTUH', 'images/staff_quarters.jpg'),
('international girls hostel', 17.4900530898275, 78.3896939197432, 'Hostels', 'International girls hostel for international students and NRIs', 'images/international_girls_hostel.jpg');

SELECT * FROM places;

SELECT * FROM places WHERE sector = 'Departments';

SELECT * FROM places WHERE sector = 'Banks';

SELECT * FROM places WHERE sector = 'Hostels';

SELECT * FROM places WHERE sector = 'Others';

SELECT * FROM places WHERE sector = 'Libraries';

SELECT * FROM places WHERE sector = 'Student Service';