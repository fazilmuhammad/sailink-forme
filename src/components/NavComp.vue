
<template>
 <nav>
    <div class="NavbarTop">
  

     <div class="upperbar" style="margin-right:12px">
          <div  v-if="isLoggedIn" class="upper_icon">
            <div class="upper_icon_icon " >
               <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }" >
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    
                    color="#09294F"
                    elevation=0
                    
                  >
                  <i class='bx bxs-user'></i>
                  &nbsp;
                   <v-text >{{userName}}</v-text>
                  &nbsp;
                  <i class='bx bxs-chevron-down'></i>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                  <v-btn 
                  block
                  plain
                  small 
                  @click="mrtgopen=true,sendDataMrtg('unmetered',row.item)" style="cursor:not-allowed">Edit Profile</v-btn>
                  </v-list-item>
                  <v-list-item>
                  <v-btn 
                  block
                  plain
                  small 
                  @click="mrtgopen=true,sendDataMrtg('unmetered',row.item)" style="cursor:not-allowed">Change Password</v-btn>
                  </v-list-item>
                   <v-list-item>
                  <v-btn 
                  block
                  plain
                  small 
                  @click="handleClick">Logout</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>

          <div  v-if="isLoggedIn && !isHome" class="upper_icon">
            <div class="upper_icon_icon " >
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="#1F7AD3"
                    elevation=0
                     to="/"
                    style="text-decoration:none;"
                  >
                  <i class='bx bxs-home'></i>
                  &nbsp;
                   Home
                  </v-btn>
                
            </div>
          </div>

          <div  v-if="isLoggedIn && isHome" class="upper_icon">
            <div class="upper_icon_icon " >
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="#1F7AD3"
                    elevation=0
                     to="/navplus"
                    style="text-decoration:none;"
                  >
                  <i class='bx bxs-dashboard'></i>
                  &nbsp;
                  Dashboard
                  </v-btn>
                
            </div>
          </div>

          <div  v-if="!isLoggedIn" class="upper_icon">
            <div class="upper_icon_icon " >
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="#09294F"
                    elevation=0
                     to="/login"
                    style="text-decoration:none;"
                  >
                   Login
                  &nbsp;
                  <i class='bx bx-door-open'></i>
                  </v-btn>
                
            </div>
          </div>
       
      </div>

    <div className='DropDown'>       
      <input type="checkbox" id="touch"> 
      <ul class="slide">
      <li><a href="#"><i class='bx bx-food-menu'></i></a></li> 
      <li><a href="#"><i class='bx bx-home-alt-2'></i></a></li>
      <li><a href="#"><i class='bx bx-user-circle'></i></a></li>
      </ul>
    </div> 

    </div>


    <div class="NavbarBottom">
      <div class="logo logo-container parallelogram">


      <!-- <div class="logo_desktop skew-fix">Logo</div> -->
      <div v-if="isServices" class="logo_desktop skew-fix"><img alt="Navplus logo" class="logo-navplus" :src="image" /></div>
      <div v-if="!isServices" class="logo_desktop skew-fix"><img alt="Navplus logo" class="logo-navplus" :src="imageb" /></div> 
      <!-- <div class="logo_mobile skew-fix"><img alt="Navplus logo" class="logo" src="../assets/images/logo_mobile.svg" width="40" height="40" /></div> -->
      
      
      
      </div>
      <div class="space"></div>
      <input type="radio" name="slider" id="menu-btn">
      <input type="radio" name="slider" id="close-btn">

      
      <ul v-if="isServices" class="nav-links" >
        <label for="close-btn" class="btn close-btn"><i class='bx bx-x' ></i></label>

        
        <li class="link_nav">
          <div class="parallelogram">
            <router-link  @click="navigator = true" to="/navplus" class="desktop-item"><P class='skew-fix text-navbar'>NAVIGATOR+</p></router-link>
          </div>
          <div class="parallelogram">
          <a href="#" class="mobile-item active"><P class='skew-fix'>NAVIGATOR+</p></a>
          </div>
          
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false" to="/mysailink" class="desktop-item" ><P class='skew-fix text-navbar'>MY SAILINK</p></router-link>
          </div>
          <div className="parallelogram">
          <a href="#" class="mobile-item"><p className="skew-fix">MY SAILINK</p></a>
          </div>
          
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/reports" class="desktop-item"><P class='skew-fix text-navbar'>REPORTS</p></router-link>
          </div>
          <div class="parallelogram">
          <a href="#" class="mobile-item"><p className="skew-fix link-text-nav">REPORTS</p></a>
          </div>
        </li>

          <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/snapshot" class="desktop-item"><P class='skew-fix text-navbar'>SNAPSHOT</p></router-link>
          </div>
          <div class="parallelogram">
          <a href="#" class="mobile-item"><p className="skew-fix">REPORTS</p></a>
          </div>
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/mythuraya" class="desktop-item"><P class='skew-fix text-navbar'>MY THURAYA</p></router-link>
          </div>
          <div className="parallelogram">
          <a href="#" class="mobile-item"><p className="skew-fix">MY THURAYA</p></a>
          </div>
          
        </li>
          <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/manifest" class="desktop-item"><P class='skew-fix text-navbar'>MANIFEST</p></router-link>
          </div>
          <div className="parallelogram">
          <a href="#" class="mobile-item"><p className="skew-fix">MANIFEST</p></a>
          </div>

        </li>

           <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/iot" class="desktop-item"><P class='skew-fix text-navbar'>IOT</p></router-link>
          </div>
          <div class="parallelogram">
            <a href="#" class="mobile-item"><p className="skew-fix">IOT</p></a>
          </div>
          
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/admin" class="desktop-item"><P class='skew-fix text-navbar'>ADMIN</p></router-link>
          </div>
          <div class="parallelogram">
            <a href="#" class="mobile-item"><p className="skew-fix">ADMIN</p></a>
          </div>
        </li>

          <li class="link_nav">
          <div class="parallelogram">
            <router-link @click="navigator = false"  to="/crewwatch" class="desktop-item"><P class='skew-fix text-navbar'>CREWWATCH</p></router-link>
          </div>
          <div class="parallelogram">
            <a href="#" class="mobile-item"><p className="skew-fix">ADMIN</p></a>
          </div>
        </li>
      </ul>




          


       <ul v-if="account" class="nav-links" >
        <label for="close-btn" class="btn close-btn"><i class='bx bx-x' ></i></label>

         <li class="link_nav">
          <div class="parallelogram">
            <router-link to="/" class="desktop-item"><P class='skew-fix'>SIGN IN</p></router-link>
          </div>
          <div class="parallelogram">
          <a href="#" class="mobile-item active"><P class='skew-fix'>NAVIGATOR+</p></a>
          </div>
          
        </li>

        <li class="link_nav">
          <div class="parallelogram">
            <router-link to="/products" class="desktop-item"><P class='skew-fix'>SIGN UP</p></router-link>
          </div>
          <div class="parallelogram">
          <a href="#" class="mobile-item active"><P class='skew-fix'>NAVIGATOR+</p></a>
          </div>
          
        </li>
      </ul>
      
      <label for="menu-btn" class="btn menu-btn"><i class='bx bx-menu '></i></label>
    </div>
  </nav>
</template>



<script>
export default {
  name: 'NavBar',
  props:['user'],
  data() {
   return {
    image: require('@/assets/images/logo.png'),
    imageb: require('@/assets/images/logo-sailink.png'),
    services: false,
    home:true,
    account:false,
    ServiceisActive: false,
    HomeisActive : false,
    AccountisActive : false,
    navigator: true,
    mysailink: false,
    reports: false,
    mythuraya: false,
    manifest: false,
    iot:false,
    admin:false,
    userNames:localStorage.getItem('name')
    
    };
 },
 


  methods: {
          handleClick(){
            localStorage.removeItem('token');
            localStorage.setItem('name','')
            localStorage.setItem('auth', false);
            this.$router.push('/login');
            window.location.reload();
          },
          serviceClick(){
            this.$router.push('/navplus/navplus')
          }
  },
  computed: {
  isHome() {
     return this.$route.name === 'home'
  },
  isServices() {
     return this.$route.name === 'navplus'
  },

  isServicesfirst() {
     return this.$route.path === '/navplus' && 'navplus/navplus'
  },

  isHomefirst(){
    return this.$route.path !== '/' && '/sailink'
  },
  isLoggedIn() {
      return localStorage.getItem('token') || this.$route.path === '/navplus' && 'navplus/navplus'
  },
  userName(){

    return localStorage.getItem('name')
  }
}
}
</script>








<style lang="scss">


.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.profil:hover .dropdown-content {
  display: block;
}












 .upperbar .active .upper_icon{
  width: 120px;
}

.upperbar .upper_icon{
  display: inline-block;
  float: right;
  margin: 8px;
  margin-right: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.upperbar .upper_icon .upper_icon-icon{
  display: flex;
  padding-left: 6px;
  transition: all 0.3s ease-out;
}





// .upperbar .upper_icon .upper_icon-icon i{
//   font-size: 20px;
//   line-height: 20px;
//   transition: all 0.3s ease-out;
  
// }

.upperbar .upper_icon span{
  font-size: 15px;
  margin-left: 10px;
  margin-top: 4px;
  transition: all 0.3s ease-out;
}
.upperbar .upper_icon span{
  color: #fff;
}



.logo-navplus{
    width: 95%;
    height: 35px;
    margin-top: 15px;
}



.parallelogram{
  transform: skew(-12deg);
}

.skew-fix{
  display:inline-block;
  transform: skew(12deg);
}

nav .NavbarBottom{
  position: relative;
  padding: 0px 40px;
  line-height:40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:6px;
  width: 100%;
}

.textlink{
  font-size: 11px;
}



.NavbarBottom .nav-links{
  display: inline-flex;
}

.logo-container{
  display: flex;
  align-items: center;
  background-color:#fff;
  height: 50px;
  position: absolute;
  margin-top: -50px;
  padding: 20px;
}

.latar{
  background-color: #000000;
  height: 900px;
}

.logo_mobile{
  display: none;
}

.bx-menu{
  margin-bottom: 630%;
  margin-left: 100%;
  font-size: 19px;
}

.nav-links{
  float: right;
  right: 0px;
  left: 500px;
  margin-top: 20px;
}

.nav-links li{
  list-style: none;
}

.nav-links .mobile-item{
  display: none;
} 


 .NavbarBottom .btn{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: none;
}
.NavbarBottom .btn.close-btn{
  position: absolute;
  right: 30px;
  top: 10px;
}

.NavbarTop{
  height: 55px;
  background: #0b4281;
  padding-right: 40px;
}


.NavbarTop ul{
  float: right;
  margin-right: 64px;
}

.NavbarTop .DropDown{
  float: right;
  margin-left: 72%;
  margin-top: 12%;
  position: absolute;
 
}

.NavbarTop ul li{
  display: inline-block;
}
.NavbarTop ul li a{
  color: #fff;
  display: block;
  padding: 0 22px;
  line-height: 46px;
  font-size: 19px;
  text-decoration: none;
  transition: .5s;
}
.NavbarTop ul li a:hover{
  color: #0b4281;
}

.NavbarTop ul li .active{
  color: #0b4281;
  font-weight: var(--fw-600);
}

.NavbarTop ul ul{
  position: absolute;
  top: 85px;
  border-top: 3px solid #23dbdb;
  opacity: 0;
  visibility: hidden;
}
.NavbarTop ul li:hover > ul{
  top: 70px;
  opacity: 1;
  visibility: visible;
  transition: .3s linear;
}
.NavbarTop ul ul li{
  width: 150px;
  display: list-item;
  position: relative;
  border: 1px solid #042331;
  border-top: none;
}
.NavbarTop ul ul li a{
  line-height: 50px;
}
.NavbarTop ul ul ul{
  border-top: none;
}
.NavbarTop ul ul ul li{
  position: relative;
  top: -70px;
  left: 150px;
}
.NavbarTop ul ul li a i{
  margin-left: 45px;
} 


.button {
  border: 1px solid #0b4281;        
  background-color: #0b4281;       
  color: #FFFFFF;                  
  font-size: 14px;                
  padding: 0.5em 1em 0.5em 1em; 
}

nav input{
  display: none;
}


.DropDownMenu{
  margin-top: 50%;
  display: none;
}

.DropDown {
  width : 100px; 
  display: block; 
}



.slide {
  clear:both;
  width:100%;
  height:0px;
  overflow: hidden;
  text-align: center;
  transition: height .4s ease;
}

.slide li {padding : 0px;
background-color: #0b4281;}

#touch {position: absolute; opacity: 0; height: 0px;}    

#touch:checked + .slide {height: 300px;} 



nav {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 13vh;
  background: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  a {
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    color: #181818;
    text-decoration: none;
    padding: 9px 15px;
    padding-bottom: 20px;
    transition: all 0.3s ease;

    &.router-link-exact-active {
        background: #0b4281;
        color: #fff;
    }

  }
}





.text-navbar{
  margin-top: 15px;
}


</style>

