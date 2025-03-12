"use strict";var sn=Object.create;var xe=Object.defineProperty;var on=Object.getOwnPropertyDescriptor;var ln=Object.getOwnPropertyNames;var cn=Object.getPrototypeOf,dn=Object.prototype.hasOwnProperty;var v=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),fn=(e,t)=>{for(var r in t)xe(e,r,{get:t[r],enumerable:!0})},jt=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of ln(t))!dn.call(e,n)&&n!==r&&xe(e,n,{get:()=>t[n],enumerable:!(i=on(t,n))||i.enumerable});return e};var N=(e,t,r)=>(r=e!=null?sn(cn(e)):{},jt(t||!e||!e.__esModule?xe(r,"default",{value:e,enumerable:!0}):r,e)),hn=e=>jt(xe({},"__esModule",{value:!0}),e);var _=v((Cl,Nt)=>{"use strict";var Ft=function(e){return typeof e<"u"&&e!==null},un=function(e){return typeof e=="object"},mn=function(e){return Object.prototype.toString.call(e)==="[object Object]"},pn=function(e){return typeof e=="function"},gn=function(e){return typeof e=="boolean"},bn=function(e){return e instanceof Buffer},vn=function(e){if(Ft(e))switch(e.constructor){case Uint8Array:case Uint8ClampedArray:case Int8Array:case Uint16Array:case Int16Array:case Uint32Array:case Int32Array:case Float32Array:case Float64Array:return!0}return!1},wn=function(e){return e instanceof ArrayBuffer},yn=function(e){return typeof e=="string"&&e.length>0},En=function(e){return typeof e=="number"&&!Number.isNaN(e)},xn=function(e){return Number.isInteger(e)},Pn=function(e,t,r){return e>=t&&e<=r},In=function(e,t){return t.includes(e)},kn=function(e,t,r){return new Error(`Expected ${t} for ${e} but received ${r} of type ${typeof r}`)},Rn=function(e,t){return t.message=e.message,t};Nt.exports={defined:Ft,object:un,plainObject:mn,fn:pn,bool:gn,buffer:bn,typedArray:vn,arrayBuffer:wn,string:yn,number:En,integer:xn,inRange:Pn,inArray:In,invalidParameterError:kn,nativeError:Rn}});var Tt=v((Bl,Bt)=>{"use strict";var Ct=()=>process.platform==="linux",Ae=null,jn=()=>{if(!Ae)if(Ct()&&process.report){let e=process.report.excludeNetwork;process.report.excludeNetwork=!0,Ae=process.report.getReport(),process.report.excludeNetwork=e}else Ae={};return Ae};Bt.exports={isLinux:Ct,getReport:jn}});var qt=v((Tl,Ot)=>{"use strict";var Mt=require("fs"),An="/usr/bin/ldd",Sn=e=>Mt.readFileSync(e,"utf-8"),$n=e=>new Promise((t,r)=>{Mt.readFile(e,"utf-8",(i,n)=>{i?r(i):t(n)})});Ot.exports={LDD_PATH:An,readFileSync:Sn,readFile:$n}});var $e=v((Ml,rr)=>{"use strict";var Dt=require("child_process"),{isLinux:ne,getReport:zt}=Tt(),{LDD_PATH:Se,readFile:Ut,readFileSync:Gt}=qt(),D,z,Wt="getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true",V="",Ht=()=>V||new Promise(e=>{Dt.exec(Wt,(t,r)=>{V=t?" ":r,e(V)})}),Vt=()=>{if(!V)try{V=Dt.execSync(Wt,{encoding:"utf8"})}catch{V=" "}return V},X="glibc",Xt=/LIBC[a-z0-9 \-).]*?(\d+\.\d+)/i,ie="musl",Ln=e=>e.includes("libc.musl-")||e.includes("ld-musl-"),Qt=()=>{let e=zt();return e.header&&e.header.glibcVersionRuntime?X:Array.isArray(e.sharedObjects)&&e.sharedObjects.some(Ln)?ie:null},Jt=e=>{let[t,r]=e.split(/[\r\n]+/);return t&&t.includes(X)?X:r&&r.includes(ie)?ie:null},Kt=e=>e.includes("musl")?ie:e.includes("GNU C Library")?X:null,Fn=async()=>{if(D!==void 0)return D;D=null;try{let e=await Ut(Se);D=Kt(e)}catch{}return D},Nn=()=>{if(D!==void 0)return D;D=null;try{let e=Gt(Se);D=Kt(e)}catch{}return D},Yt=async()=>{let e=null;if(ne()&&(e=await Fn(),e||(e=Qt()),!e)){let t=await Ht();e=Jt(t)}return e},Zt=()=>{let e=null;if(ne()&&(e=Nn(),e||(e=Qt()),!e)){let t=Vt();e=Jt(t)}return e},Cn=async()=>ne()&&await Yt()!==X,Bn=()=>ne()&&Zt()!==X,Tn=async()=>{if(z!==void 0)return z;z=null;try{let t=(await Ut(Se)).match(Xt);t&&(z=t[1])}catch{}return z},Mn=()=>{if(z!==void 0)return z;z=null;try{let t=Gt(Se).match(Xt);t&&(z=t[1])}catch{}return z},er=()=>{let e=zt();return e.header&&e.header.glibcVersionRuntime?e.header.glibcVersionRuntime:null},_t=e=>e.trim().split(/\s+/)[1],tr=e=>{let[t,r,i]=e.split(/[\r\n]+/);return t&&t.includes(X)?_t(t):r&&i&&r.includes(ie)?_t(i):null},On=async()=>{let e=null;if(ne()&&(e=await Tn(),e||(e=er()),!e)){let t=await Ht();e=tr(t)}return e},qn=()=>{let e=null;if(ne()&&(e=Mn(),e||(e=er()),!e)){let t=Vt();e=tr(t)}return e};rr.exports={GLIBC:X,MUSL:ie,family:Yt,familySync:Zt,isNonGlibcLinux:Cn,isNonGlibcLinuxSync:Bn,version:On,versionSync:qn}});var me=v((Ol,ir)=>{var _n=typeof process=="object"&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};ir.exports=_n});var Le=v((ql,nr)=>{var Dn="2.0.0",zn=Number.MAX_SAFE_INTEGER||9007199254740991,Un=16,Gn=250,Wn=["major","premajor","minor","preminor","patch","prepatch","prerelease"];nr.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:Un,MAX_SAFE_BUILD_LENGTH:Gn,MAX_SAFE_INTEGER:zn,RELEASE_TYPES:Wn,SEMVER_SPEC_VERSION:Dn,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}});var pe=v((U,ar)=>{var{MAX_SAFE_COMPONENT_LENGTH:Ye,MAX_SAFE_BUILD_LENGTH:Hn,MAX_LENGTH:Vn}=Le(),Xn=me();U=ar.exports={};var Qn=U.re=[],Jn=U.safeRe=[],u=U.src=[],Kn=U.safeSrc=[],m=U.t={},Yn=0,Ze="[a-zA-Z0-9-]",Zn=[["\\s",1],["\\d",Vn],[Ze,Hn]],ea=e=>{for(let[t,r]of Zn)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e},y=(e,t,r)=>{let i=ea(t),n=Yn++;Xn(e,n,t),m[e]=n,u[n]=t,Kn[n]=i,Qn[n]=new RegExp(t,r?"g":void 0),Jn[n]=new RegExp(i,r?"g":void 0)};y("NUMERICIDENTIFIER","0|[1-9]\\d*");y("NUMERICIDENTIFIERLOOSE","\\d+");y("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${Ze}*`);y("MAINVERSION",`(${u[m.NUMERICIDENTIFIER]})\\.(${u[m.NUMERICIDENTIFIER]})\\.(${u[m.NUMERICIDENTIFIER]})`);y("MAINVERSIONLOOSE",`(${u[m.NUMERICIDENTIFIERLOOSE]})\\.(${u[m.NUMERICIDENTIFIERLOOSE]})\\.(${u[m.NUMERICIDENTIFIERLOOSE]})`);y("PRERELEASEIDENTIFIER",`(?:${u[m.NUMERICIDENTIFIER]}|${u[m.NONNUMERICIDENTIFIER]})`);y("PRERELEASEIDENTIFIERLOOSE",`(?:${u[m.NUMERICIDENTIFIERLOOSE]}|${u[m.NONNUMERICIDENTIFIER]})`);y("PRERELEASE",`(?:-(${u[m.PRERELEASEIDENTIFIER]}(?:\\.${u[m.PRERELEASEIDENTIFIER]})*))`);y("PRERELEASELOOSE",`(?:-?(${u[m.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[m.PRERELEASEIDENTIFIERLOOSE]})*))`);y("BUILDIDENTIFIER",`${Ze}+`);y("BUILD",`(?:\\+(${u[m.BUILDIDENTIFIER]}(?:\\.${u[m.BUILDIDENTIFIER]})*))`);y("FULLPLAIN",`v?${u[m.MAINVERSION]}${u[m.PRERELEASE]}?${u[m.BUILD]}?`);y("FULL",`^${u[m.FULLPLAIN]}$`);y("LOOSEPLAIN",`[v=\\s]*${u[m.MAINVERSIONLOOSE]}${u[m.PRERELEASELOOSE]}?${u[m.BUILD]}?`);y("LOOSE",`^${u[m.LOOSEPLAIN]}$`);y("GTLT","((?:<|>)?=?)");y("XRANGEIDENTIFIERLOOSE",`${u[m.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);y("XRANGEIDENTIFIER",`${u[m.NUMERICIDENTIFIER]}|x|X|\\*`);y("XRANGEPLAIN",`[v=\\s]*(${u[m.XRANGEIDENTIFIER]})(?:\\.(${u[m.XRANGEIDENTIFIER]})(?:\\.(${u[m.XRANGEIDENTIFIER]})(?:${u[m.PRERELEASE]})?${u[m.BUILD]}?)?)?`);y("XRANGEPLAINLOOSE",`[v=\\s]*(${u[m.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[m.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[m.XRANGEIDENTIFIERLOOSE]})(?:${u[m.PRERELEASELOOSE]})?${u[m.BUILD]}?)?)?`);y("XRANGE",`^${u[m.GTLT]}\\s*${u[m.XRANGEPLAIN]}$`);y("XRANGELOOSE",`^${u[m.GTLT]}\\s*${u[m.XRANGEPLAINLOOSE]}$`);y("COERCEPLAIN",`(^|[^\\d])(\\d{1,${Ye}})(?:\\.(\\d{1,${Ye}}))?(?:\\.(\\d{1,${Ye}}))?`);y("COERCE",`${u[m.COERCEPLAIN]}(?:$|[^\\d])`);y("COERCEFULL",u[m.COERCEPLAIN]+`(?:${u[m.PRERELEASE]})?(?:${u[m.BUILD]})?(?:$|[^\\d])`);y("COERCERTL",u[m.COERCE],!0);y("COERCERTLFULL",u[m.COERCEFULL],!0);y("LONETILDE","(?:~>?)");y("TILDETRIM",`(\\s*)${u[m.LONETILDE]}\\s+`,!0);U.tildeTrimReplace="$1~";y("TILDE",`^${u[m.LONETILDE]}${u[m.XRANGEPLAIN]}$`);y("TILDELOOSE",`^${u[m.LONETILDE]}${u[m.XRANGEPLAINLOOSE]}$`);y("LONECARET","(?:\\^)");y("CARETTRIM",`(\\s*)${u[m.LONECARET]}\\s+`,!0);U.caretTrimReplace="$1^";y("CARET",`^${u[m.LONECARET]}${u[m.XRANGEPLAIN]}$`);y("CARETLOOSE",`^${u[m.LONECARET]}${u[m.XRANGEPLAINLOOSE]}$`);y("COMPARATORLOOSE",`^${u[m.GTLT]}\\s*(${u[m.LOOSEPLAIN]})$|^$`);y("COMPARATOR",`^${u[m.GTLT]}\\s*(${u[m.FULLPLAIN]})$|^$`);y("COMPARATORTRIM",`(\\s*)${u[m.GTLT]}\\s*(${u[m.LOOSEPLAIN]}|${u[m.XRANGEPLAIN]})`,!0);U.comparatorTrimReplace="$1$2$3";y("HYPHENRANGE",`^\\s*(${u[m.XRANGEPLAIN]})\\s+-\\s+(${u[m.XRANGEPLAIN]})\\s*$`);y("HYPHENRANGELOOSE",`^\\s*(${u[m.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[m.XRANGEPLAINLOOSE]})\\s*$`);y("STAR","(<|>)?=?\\s*\\*");y("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$");y("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")});var Fe=v((_l,sr)=>{var ta=Object.freeze({loose:!0}),ra=Object.freeze({}),ia=e=>e?typeof e!="object"?ta:e:ra;sr.exports=ia});var dr=v((Dl,cr)=>{var or=/^[0-9]+$/,lr=(e,t)=>{let r=or.test(e),i=or.test(t);return r&&i&&(e=+e,t=+t),e===t?0:r&&!i?-1:i&&!r?1:e<t?-1:1},na=(e,t)=>lr(t,e);cr.exports={compareIdentifiers:lr,rcompareIdentifiers:na}});var se=v((zl,mr)=>{var Ne=me(),{MAX_LENGTH:fr,MAX_SAFE_INTEGER:Ce}=Le(),{safeRe:hr,safeSrc:ur,t:Be}=pe(),aa=Fe(),{compareIdentifiers:ae}=dr(),et=class e{constructor(t,r){if(r=aa(r),t instanceof e){if(t.loose===!!r.loose&&t.includePrerelease===!!r.includePrerelease)return t;t=t.version}else if(typeof t!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);if(t.length>fr)throw new TypeError(`version is longer than ${fr} characters`);Ne("SemVer",t,r),this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease;let i=t.trim().match(r.loose?hr[Be.LOOSE]:hr[Be.FULL]);if(!i)throw new TypeError(`Invalid Version: ${t}`);if(this.raw=t,this.major=+i[1],this.minor=+i[2],this.patch=+i[3],this.major>Ce||this.major<0)throw new TypeError("Invalid major version");if(this.minor>Ce||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>Ce||this.patch<0)throw new TypeError("Invalid patch version");i[4]?this.prerelease=i[4].split(".").map(n=>{if(/^[0-9]+$/.test(n)){let s=+n;if(s>=0&&s<Ce)return s}return n}):this.prerelease=[],this.build=i[5]?i[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(t){if(Ne("SemVer.compare",this.version,this.options,t),!(t instanceof e)){if(typeof t=="string"&&t===this.version)return 0;t=new e(t,this.options)}return t.version===this.version?0:this.compareMain(t)||this.comparePre(t)}compareMain(t){return t instanceof e||(t=new e(t,this.options)),ae(this.major,t.major)||ae(this.minor,t.minor)||ae(this.patch,t.patch)}comparePre(t){if(t instanceof e||(t=new e(t,this.options)),this.prerelease.length&&!t.prerelease.length)return-1;if(!this.prerelease.length&&t.prerelease.length)return 1;if(!this.prerelease.length&&!t.prerelease.length)return 0;let r=0;do{let i=this.prerelease[r],n=t.prerelease[r];if(Ne("prerelease compare",r,i,n),i===void 0&&n===void 0)return 0;if(n===void 0)return 1;if(i===void 0)return-1;if(i===n)continue;return ae(i,n)}while(++r)}compareBuild(t){t instanceof e||(t=new e(t,this.options));let r=0;do{let i=this.build[r],n=t.build[r];if(Ne("build compare",r,i,n),i===void 0&&n===void 0)return 0;if(n===void 0)return 1;if(i===void 0)return-1;if(i===n)continue;return ae(i,n)}while(++r)}inc(t,r,i){if(t.startsWith("pre")){if(!r&&i===!1)throw new Error("invalid increment argument: identifier is empty");if(r){let n=new RegExp(`^${this.options.loose?ur[Be.PRERELEASELOOSE]:ur[Be.PRERELEASE]}$`),s=`-${r}`.match(n);if(!s||s[1]!==r)throw new Error(`invalid identifier: ${r}`)}}switch(t){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",r,i);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",r,i);break;case"prepatch":this.prerelease.length=0,this.inc("patch",r,i),this.inc("pre",r,i);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",r,i),this.inc("pre",r,i);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{let n=Number(i)?1:0;if(this.prerelease.length===0)this.prerelease=[n];else{let s=this.prerelease.length;for(;--s>=0;)typeof this.prerelease[s]=="number"&&(this.prerelease[s]++,s=-2);if(s===-1){if(r===this.prerelease.join(".")&&i===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(n)}}if(r){let s=[r,n];i===!1&&(s=[r]),ae(this.prerelease[0],r)===0?isNaN(this.prerelease[1])&&(this.prerelease=s):this.prerelease=s}break}default:throw new Error(`invalid increment argument: ${t}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}};mr.exports=et});var br=v((Ul,gr)=>{var pr=se(),sa=(e,t,r=!1)=>{if(e instanceof pr)return e;try{return new pr(e,t)}catch(i){if(!r)return null;throw i}};gr.exports=sa});var wr=v((Gl,vr)=>{var oa=se(),la=br(),{safeRe:Te,t:Me}=pe(),ca=(e,t)=>{if(e instanceof oa)return e;if(typeof e=="number"&&(e=String(e)),typeof e!="string")return null;t=t||{};let r=null;if(!t.rtl)r=e.match(t.includePrerelease?Te[Me.COERCEFULL]:Te[Me.COERCE]);else{let d=t.includePrerelease?Te[Me.COERCERTLFULL]:Te[Me.COERCERTL],h;for(;(h=d.exec(e))&&(!r||r.index+r[0].length!==e.length);)(!r||h.index+h[0].length!==r.index+r[0].length)&&(r=h),d.lastIndex=h.index+h[1].length+h[2].length;d.lastIndex=-1}if(r===null)return null;let i=r[2],n=r[3]||"0",s=r[4]||"0",o=t.includePrerelease&&r[5]?`-${r[5]}`:"",l=t.includePrerelease&&r[6]?`+${r[6]}`:"";return la(`${i}.${n}.${s}${o}${l}`,t)};vr.exports=ca});var Z=v((Wl,Er)=>{var yr=se(),da=(e,t,r)=>new yr(e,r).compare(new yr(t,r));Er.exports=da});var tt=v((Hl,xr)=>{var fa=Z(),ha=(e,t,r)=>fa(e,t,r)>=0;xr.exports=ha});var Ir=v((Vl,Pr)=>{var rt=class{constructor(){this.max=1e3,this.map=new Map}get(t){let r=this.map.get(t);if(r!==void 0)return this.map.delete(t),this.map.set(t,r),r}delete(t){return this.map.delete(t)}set(t,r){if(!this.delete(t)&&r!==void 0){if(this.map.size>=this.max){let n=this.map.keys().next().value;this.delete(n)}this.map.set(t,r)}return this}};Pr.exports=rt});var Rr=v((Xl,kr)=>{var ua=Z(),ma=(e,t,r)=>ua(e,t,r)===0;kr.exports=ma});var Ar=v((Ql,jr)=>{var pa=Z(),ga=(e,t,r)=>pa(e,t,r)!==0;jr.exports=ga});var $r=v((Jl,Sr)=>{var ba=Z(),va=(e,t,r)=>ba(e,t,r)>0;Sr.exports=va});var Fr=v((Kl,Lr)=>{var wa=Z(),ya=(e,t,r)=>wa(e,t,r)<0;Lr.exports=ya});var Cr=v((Yl,Nr)=>{var Ea=Z(),xa=(e,t,r)=>Ea(e,t,r)<=0;Nr.exports=xa});var Tr=v((Zl,Br)=>{var Pa=Rr(),Ia=Ar(),ka=$r(),Ra=tt(),ja=Fr(),Aa=Cr(),Sa=(e,t,r,i)=>{switch(t){case"===":return typeof e=="object"&&(e=e.version),typeof r=="object"&&(r=r.version),e===r;case"!==":return typeof e=="object"&&(e=e.version),typeof r=="object"&&(r=r.version),e!==r;case"":case"=":case"==":return Pa(e,r,i);case"!=":return Ia(e,r,i);case">":return ka(e,r,i);case">=":return Ra(e,r,i);case"<":return ja(e,r,i);case"<=":return Aa(e,r,i);default:throw new TypeError(`Invalid operator: ${t}`)}};Br.exports=Sa});var Ur=v((ec,zr)=>{var ge=Symbol("SemVer ANY"),at=class e{static get ANY(){return ge}constructor(t,r){if(r=Mr(r),t instanceof e){if(t.loose===!!r.loose)return t;t=t.value}t=t.trim().split(/\s+/).join(" "),nt("comparator",t,r),this.options=r,this.loose=!!r.loose,this.parse(t),this.semver===ge?this.value="":this.value=this.operator+this.semver.version,nt("comp",this)}parse(t){let r=this.options.loose?Or[qr.COMPARATORLOOSE]:Or[qr.COMPARATOR],i=t.match(r);if(!i)throw new TypeError(`Invalid comparator: ${t}`);this.operator=i[1]!==void 0?i[1]:"",this.operator==="="&&(this.operator=""),i[2]?this.semver=new _r(i[2],this.options.loose):this.semver=ge}toString(){return this.value}test(t){if(nt("Comparator.test",t,this.options.loose),this.semver===ge||t===ge)return!0;if(typeof t=="string")try{t=new _r(t,this.options)}catch{return!1}return it(t,this.operator,this.semver,this.options)}intersects(t,r){if(!(t instanceof e))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new Dr(t.value,r).test(this.value):t.operator===""?t.value===""?!0:new Dr(this.value,r).test(t.semver):(r=Mr(r),r.includePrerelease&&(this.value==="<0.0.0-0"||t.value==="<0.0.0-0")||!r.includePrerelease&&(this.value.startsWith("<0.0.0")||t.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&t.operator.startsWith(">")||this.operator.startsWith("<")&&t.operator.startsWith("<")||this.semver.version===t.semver.version&&this.operator.includes("=")&&t.operator.includes("=")||it(this.semver,"<",t.semver,r)&&this.operator.startsWith(">")&&t.operator.startsWith("<")||it(this.semver,">",t.semver,r)&&this.operator.startsWith("<")&&t.operator.startsWith(">")))}};zr.exports=at;var Mr=Fe(),{safeRe:Or,t:qr}=pe(),it=Tr(),nt=me(),_r=se(),Dr=st()});var st=v((tc,Vr)=>{var $a=/\s+/g,ot=class e{constructor(t,r){if(r=Fa(r),t instanceof e)return t.loose===!!r.loose&&t.includePrerelease===!!r.includePrerelease?t:new e(t.raw,r);if(t instanceof lt)return this.raw=t.value,this.set=[[t]],this.formatted=void 0,this;if(this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,this.raw=t.trim().replace($a," "),this.set=this.raw.split("||").map(i=>this.parseRange(i.trim())).filter(i=>i.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){let i=this.set[0];if(this.set=this.set.filter(n=>!Wr(n[0])),this.set.length===0)this.set=[i];else if(this.set.length>1){for(let n of this.set)if(n.length===1&&qa(n[0])){this.set=[n];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let t=0;t<this.set.length;t++){t>0&&(this.formatted+="||");let r=this.set[t];for(let i=0;i<r.length;i++)i>0&&(this.formatted+=" "),this.formatted+=r[i].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(t){let i=((this.options.includePrerelease&&Ma)|(this.options.loose&&Oa))+":"+t,n=Gr.get(i);if(n)return n;let s=this.options.loose,o=s?C[$.HYPHENRANGELOOSE]:C[$.HYPHENRANGE];t=t.replace(o,Qa(this.options.includePrerelease)),x("hyphen replace",t),t=t.replace(C[$.COMPARATORTRIM],Ca),x("comparator trim",t),t=t.replace(C[$.TILDETRIM],Ba),x("tilde trim",t),t=t.replace(C[$.CARETTRIM],Ta),x("caret trim",t);let l=t.split(" ").map(w=>_a(w,this.options)).join(" ").split(/\s+/).map(w=>Xa(w,this.options));s&&(l=l.filter(w=>(x("loose invalid filter",w,this.options),!!w.match(C[$.COMPARATORLOOSE])))),x("range list",l);let d=new Map,h=l.map(w=>new lt(w,this.options));for(let w of h){if(Wr(w))return[w];d.set(w.value,w)}d.size>1&&d.has("")&&d.delete("");let b=[...d.values()];return Gr.set(i,b),b}intersects(t,r){if(!(t instanceof e))throw new TypeError("a Range is required");return this.set.some(i=>Hr(i,r)&&t.set.some(n=>Hr(n,r)&&i.every(s=>n.every(o=>s.intersects(o,r)))))}test(t){if(!t)return!1;if(typeof t=="string")try{t=new Na(t,this.options)}catch{return!1}for(let r=0;r<this.set.length;r++)if(Ja(this.set[r],t,this.options))return!0;return!1}};Vr.exports=ot;var La=Ir(),Gr=new La,Fa=Fe(),lt=Ur(),x=me(),Na=se(),{safeRe:C,t:$,comparatorTrimReplace:Ca,tildeTrimReplace:Ba,caretTrimReplace:Ta}=pe(),{FLAG_INCLUDE_PRERELEASE:Ma,FLAG_LOOSE:Oa}=Le(),Wr=e=>e.value==="<0.0.0-0",qa=e=>e.value==="",Hr=(e,t)=>{let r=!0,i=e.slice(),n=i.pop();for(;r&&i.length;)r=i.every(s=>n.intersects(s,t)),n=i.pop();return r},_a=(e,t)=>(x("comp",e,t),e=Ua(e,t),x("caret",e),e=Da(e,t),x("tildes",e),e=Wa(e,t),x("xrange",e),e=Va(e,t),x("stars",e),e),L=e=>!e||e.toLowerCase()==="x"||e==="*",Da=(e,t)=>e.trim().split(/\s+/).map(r=>za(r,t)).join(" "),za=(e,t)=>{let r=t.loose?C[$.TILDELOOSE]:C[$.TILDE];return e.replace(r,(i,n,s,o,l)=>{x("tilde",e,i,n,s,o,l);let d;return L(n)?d="":L(s)?d=`>=${n}.0.0 <${+n+1}.0.0-0`:L(o)?d=`>=${n}.${s}.0 <${n}.${+s+1}.0-0`:l?(x("replaceTilde pr",l),d=`>=${n}.${s}.${o}-${l} <${n}.${+s+1}.0-0`):d=`>=${n}.${s}.${o} <${n}.${+s+1}.0-0`,x("tilde return",d),d})},Ua=(e,t)=>e.trim().split(/\s+/).map(r=>Ga(r,t)).join(" "),Ga=(e,t)=>{x("caret",e,t);let r=t.loose?C[$.CARETLOOSE]:C[$.CARET],i=t.includePrerelease?"-0":"";return e.replace(r,(n,s,o,l,d)=>{x("caret",e,n,s,o,l,d);let h;return L(s)?h="":L(o)?h=`>=${s}.0.0${i} <${+s+1}.0.0-0`:L(l)?s==="0"?h=`>=${s}.${o}.0${i} <${s}.${+o+1}.0-0`:h=`>=${s}.${o}.0${i} <${+s+1}.0.0-0`:d?(x("replaceCaret pr",d),s==="0"?o==="0"?h=`>=${s}.${o}.${l}-${d} <${s}.${o}.${+l+1}-0`:h=`>=${s}.${o}.${l}-${d} <${s}.${+o+1}.0-0`:h=`>=${s}.${o}.${l}-${d} <${+s+1}.0.0-0`):(x("no pr"),s==="0"?o==="0"?h=`>=${s}.${o}.${l}${i} <${s}.${o}.${+l+1}-0`:h=`>=${s}.${o}.${l}${i} <${s}.${+o+1}.0-0`:h=`>=${s}.${o}.${l} <${+s+1}.0.0-0`),x("caret return",h),h})},Wa=(e,t)=>(x("replaceXRanges",e,t),e.split(/\s+/).map(r=>Ha(r,t)).join(" ")),Ha=(e,t)=>{e=e.trim();let r=t.loose?C[$.XRANGELOOSE]:C[$.XRANGE];return e.replace(r,(i,n,s,o,l,d)=>{x("xRange",e,i,n,s,o,l,d);let h=L(s),b=h||L(o),w=b||L(l),O=w;return n==="="&&O&&(n=""),d=t.includePrerelease?"-0":"",h?n===">"||n==="<"?i="<0.0.0-0":i="*":n&&O?(b&&(o=0),l=0,n===">"?(n=">=",b?(s=+s+1,o=0,l=0):(o=+o+1,l=0)):n==="<="&&(n="<",b?s=+s+1:o=+o+1),n==="<"&&(d="-0"),i=`${n+s}.${o}.${l}${d}`):b?i=`>=${s}.0.0${d} <${+s+1}.0.0-0`:w&&(i=`>=${s}.${o}.0${d} <${s}.${+o+1}.0-0`),x("xRange return",i),i})},Va=(e,t)=>(x("replaceStars",e,t),e.trim().replace(C[$.STAR],"")),Xa=(e,t)=>(x("replaceGTE0",e,t),e.trim().replace(C[t.includePrerelease?$.GTE0PRE:$.GTE0],"")),Qa=e=>(t,r,i,n,s,o,l,d,h,b,w,O)=>(L(i)?r="":L(n)?r=`>=${i}.0.0${e?"-0":""}`:L(s)?r=`>=${i}.${n}.0${e?"-0":""}`:o?r=`>=${r}`:r=`>=${r}${e?"-0":""}`,L(h)?d="":L(b)?d=`<${+h+1}.0.0-0`:L(w)?d=`<${h}.${+b+1}.0-0`:O?d=`<=${h}.${b}.${w}-${O}`:e?d=`<${h}.${b}.${+w+1}-0`:d=`<=${d}`,`${r} ${d}`.trim()),Ja=(e,t,r)=>{for(let i=0;i<e.length;i++)if(!e[i].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){for(let i=0;i<e.length;i++)if(x(e[i].semver),e[i].semver!==lt.ANY&&e[i].semver.prerelease.length>0){let n=e[i].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0}return!1}return!0}});var Qr=v((rc,Xr)=>{var Ka=st(),Ya=(e,t,r)=>{try{t=new Ka(t,r)}catch{return!1}return t.test(e)};Xr.exports=Ya});var ct=v((ic,Za)=>{Za.exports={name:"sharp",description:"High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images",version:"0.33.5",author:"Lovell Fuller <npm@lovell.info>",homepage:"https://sharp.pixelplumbing.com",contributors:["Pierre Inglebert <pierre.inglebert@gmail.com>","Jonathan Ong <jonathanrichardong@gmail.com>","Chanon Sajjamanochai <chanon.s@gmail.com>","Juliano Julio <julianojulio@gmail.com>","Daniel Gasienica <daniel@gasienica.ch>","Julian Walker <julian@fiftythree.com>","Amit Pitaru <pitaru.amit@gmail.com>","Brandon Aaron <hello.brandon@aaron.sh>","Andreas Lind <andreas@one.com>","Maurus Cuelenaere <mcuelenaere@gmail.com>","Linus Unneb\xE4ck <linus@folkdatorn.se>","Victor Mateevitsi <mvictoras@gmail.com>","Alaric Holloway <alaric.holloway@gmail.com>","Bernhard K. Weisshuhn <bkw@codingforce.com>","Chris Riley <criley@primedia.com>","David Carley <dacarley@gmail.com>","John Tobin <john@limelightmobileinc.com>","Kenton Gray <kentongray@gmail.com>","Felix B\xFCnemann <Felix.Buenemann@gmail.com>","Samy Al Zahrani <samyalzahrany@gmail.com>","Chintan Thakkar <lemnisk8@gmail.com>","F. Orlando Galashan <frulo@gmx.de>","Kleis Auke Wolthuizen <info@kleisauke.nl>","Matt Hirsch <mhirsch@media.mit.edu>","Matthias Thoemmes <thoemmes@gmail.com>","Patrick Paskaris <patrick@paskaris.gr>","J\xE9r\xE9my Lal <kapouer@melix.org>","Rahul Nanwani <r.nanwani@gmail.com>","Alice Monday <alice0meta@gmail.com>","Kristo Jorgenson <kristo.jorgenson@gmail.com>","YvesBos <yves_bos@outlook.com>","Guy Maliar <guy@tailorbrands.com>","Nicolas Coden <nicolas@ncoden.fr>","Matt Parrish <matt.r.parrish@gmail.com>","Marcel Bretschneider <marcel.bretschneider@gmail.com>","Matthew McEachen <matthew+github@mceachen.org>","Jarda Kot\u011B\u0161ovec <jarda.kotesovec@gmail.com>","Kenric D'Souza <kenric.dsouza@gmail.com>","Oleh Aleinyk <oleg.aleynik@gmail.com>","Marcel Bretschneider <marcel.bretschneider@gmail.com>","Andrea Bianco <andrea.bianco@unibas.ch>","Rik Heywood <rik@rik.org>","Thomas Parisot <hi@oncletom.io>","Nathan Graves <nathanrgraves+github@gmail.com>","Tom Lokhorst <tom@lokhorst.eu>","Espen Hovlandsdal <espen@hovlandsdal.com>","Sylvain Dumont <sylvain.dumont35@gmail.com>","Alun Davies <alun.owain.davies@googlemail.com>","Aidan Hoolachan <ajhoolachan21@gmail.com>","Axel Eirola <axel.eirola@iki.fi>","Freezy <freezy@xbmc.org>","Daiz <taneli.vatanen@gmail.com>","Julian Aubourg <j@ubourg.net>","Keith Belovay <keith@picthrive.com>","Michael B. Klein <mbklein@gmail.com>","Jordan Prudhomme <jordan@raboland.fr>","Ilya Ovdin <iovdin@gmail.com>","Andargor <andargor@yahoo.com>","Paul Neave <paul.neave@gmail.com>","Brendan Kennedy <brenwken@gmail.com>","Brychan Bennett-Odlum <git@brychan.io>","Edward Silverton <e.silverton@gmail.com>","Roman Malieiev <aromaleev@gmail.com>","Tomas Szabo <tomas.szabo@deftomat.com>","Robert O'Rourke <robert@o-rourke.org>","Guillermo Alfonso Varela Chouci\xF1o <guillevch@gmail.com>","Christian Flintrup <chr@gigahost.dk>","Manan Jadhav <manan@motionden.com>","Leon Radley <leon@radley.se>","alza54 <alza54@thiocod.in>","Jacob Smith <jacob@frende.me>","Michael Nutt <michael@nutt.im>","Brad Parham <baparham@gmail.com>","Taneli Vatanen <taneli.vatanen@gmail.com>","Joris Dugu\xE9 <zaruike10@gmail.com>","Chris Banks <christopher.bradley.banks@gmail.com>","Ompal Singh <ompal.hitm09@gmail.com>","Brodan <christopher.hranj@gmail.com>","Ankur Parihar <ankur.github@gmail.com>","Brahim Ait elhaj <brahima@gmail.com>","Mart Jansink <m.jansink@gmail.com>","Lachlan Newman <lachnewman007@gmail.com>","Dennis Beatty <dennis@dcbeatty.com>","Ingvar Stepanyan <me@rreverser.com>","Don Denton <don@happycollision.com>"],scripts:{install:"node install/check",clean:"rm -rf src/build/ .nyc_output/ coverage/ test/fixtures/output.*",test:"npm run test-lint && npm run test-unit && npm run test-licensing && npm run test-types","test-lint":"semistandard && cpplint","test-unit":"nyc --reporter=lcov --reporter=text --check-coverage --branches=100 mocha","test-licensing":'license-checker --production --summary --onlyAllow="Apache-2.0;BSD;ISC;LGPL-3.0-or-later;MIT"',"test-leak":"./test/leak/leak.sh","test-types":"tsd","package-from-local-build":"node npm/from-local-build","package-from-github-release":"node npm/from-github-release","docs-build":"node docs/build && node docs/search-index/build","docs-serve":"cd docs && npx serve","docs-publish":"cd docs && npx firebase-tools deploy --project pixelplumbing --only hosting:pixelplumbing-sharp"},type:"commonjs",main:"lib/index.js",types:"lib/index.d.ts",files:["install","lib","src/*.{cc,h,gyp}"],repository:{type:"git",url:"git://github.com/lovell/sharp.git"},keywords:["jpeg","png","webp","avif","tiff","gif","svg","jp2","dzi","image","resize","thumbnail","crop","embed","libvips","vips"],dependencies:{color:"^4.2.3","detect-libc":"^2.0.3",semver:"^7.6.3"},optionalDependencies:{"@img/sharp-darwin-arm64":"0.33.5","@img/sharp-darwin-x64":"0.33.5","@img/sharp-libvips-darwin-arm64":"1.0.4","@img/sharp-libvips-darwin-x64":"1.0.4","@img/sharp-libvips-linux-arm":"1.0.5","@img/sharp-libvips-linux-arm64":"1.0.4","@img/sharp-libvips-linux-s390x":"1.0.4","@img/sharp-libvips-linux-x64":"1.0.4","@img/sharp-libvips-linuxmusl-arm64":"1.0.4","@img/sharp-libvips-linuxmusl-x64":"1.0.4","@img/sharp-linux-arm":"0.33.5","@img/sharp-linux-arm64":"0.33.5","@img/sharp-linux-s390x":"0.33.5","@img/sharp-linux-x64":"0.33.5","@img/sharp-linuxmusl-arm64":"0.33.5","@img/sharp-linuxmusl-x64":"0.33.5","@img/sharp-wasm32":"0.33.5","@img/sharp-win32-ia32":"0.33.5","@img/sharp-win32-x64":"0.33.5"},devDependencies:{"@emnapi/runtime":"^1.2.0","@img/sharp-libvips-dev":"1.0.4","@img/sharp-libvips-dev-wasm32":"1.0.5","@img/sharp-libvips-win32-ia32":"1.0.4","@img/sharp-libvips-win32-x64":"1.0.4","@types/node":"*",async:"^3.2.5",cc:"^3.0.1",emnapi:"^1.2.0","exif-reader":"^2.0.1","extract-zip":"^2.0.1",icc:"^3.0.0","jsdoc-to-markdown":"^8.0.3","license-checker":"^25.0.1",mocha:"^10.7.3","node-addon-api":"^8.1.0",nyc:"^17.0.0",prebuild:"^13.0.1",semistandard:"^17.0.0","tar-fs":"^3.0.6",tsd:"^0.31.1"},license:"Apache-2.0",engines:{node:"^18.17.0 || ^20.3.0 || >=21.0.0"},config:{libvips:">=8.15.3"},funding:{url:"https://opencollective.com/libvips"},binary:{napi_versions:[9]},semistandard:{env:["mocha"]},cc:{linelength:"120",filter:["build/include"]},nyc:{include:["lib"]},tsd:{directory:"test/types/"}}});var ft=v((nc,ai)=>{"use strict";var{spawnSync:Oe}=require("node:child_process"),{createHash:es}=require("node:crypto"),Zr=wr(),ts=tt(),rs=Qr(),Jr=$e(),{config:is,engines:Kr,optionalDependencies:ns}=ct(),as=process.env.npm_package_config_libvips||is.libvips,ei=Zr(as).version,ss=["darwin-arm64","darwin-x64","linux-arm","linux-arm64","linux-s390x","linux-x64","linuxmusl-arm64","linuxmusl-x64","win32-ia32","win32-x64"],qe={encoding:"utf8",shell:!0},os=e=>{e instanceof Error?console.error(`sharp: Installation error: ${e.message}`):console.log(`sharp: ${e}`)},ti=()=>Jr.isNonGlibcLinuxSync()?Jr.familySync():"",ls=()=>`${process.platform}${ti()}-${process.arch}`,oe=()=>{if(ri())return"wasm32";let{npm_config_arch:e,npm_config_platform:t,npm_config_libc:r}=process.env,i=typeof r=="string"?r:ti();return`${t||process.platform}${i}-${e||process.arch}`},cs=()=>{try{return require(`@img/sharp-libvips-dev-${oe()}/include`)}catch{try{return require("@img/sharp-libvips-dev/include")}catch{}}return""},ds=()=>{try{return require("@img/sharp-libvips-dev/cplusplus")}catch{}return""},fs=()=>{try{return require(`@img/sharp-libvips-dev-${oe()}/lib`)}catch{try{return require(`@img/sharp-libvips-${oe()}/lib`)}catch{}}return""},hs=()=>{if(process.release?.name==="node"&&process.versions&&!rs(process.versions.node,Kr.node))return{found:process.versions.node,expected:Kr.node}},ri=()=>{let{CC:e}=process.env;return!!(e&&e.endsWith("/emcc"))},us=()=>process.platform==="darwin"&&process.arch==="x64"?(Oe("sysctl sysctl.proc_translated",qe).stdout||"").trim()==="sysctl.proc_translated: 1":!1,Yr=e=>es("sha512").update(e).digest("hex"),ms=()=>{try{let e=Yr(`imgsharp-libvips-${oe()}`),t=Zr(ns[`@img/sharp-libvips-${oe()}`]).version;return Yr(`${e}npm:${t}`).slice(0,10)}catch{}return""},ps=()=>Oe(`node-gyp rebuild --directory=src ${ri()?"--nodedir=emscripten":""}`,{...qe,stdio:"inherit"}).status,ii=()=>process.platform!=="win32"?(Oe("pkg-config --modversion vips-cpp",{...qe,env:{...process.env,PKG_CONFIG_PATH:ni()}}).stdout||"").trim():"",ni=()=>process.platform!=="win32"?[(Oe('which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2',qe).stdout||"").trim(),process.env.PKG_CONFIG_PATH,"/usr/local/lib/pkgconfig","/usr/lib/pkgconfig","/usr/local/libdata/pkgconfig","/usr/libdata/pkgconfig"].filter(Boolean).join(":"):"",dt=(e,t,r)=>(r&&r(`Detected ${t}, skipping search for globally-installed libvips`),e),gs=e=>{if(process.env.SHARP_IGNORE_GLOBAL_LIBVIPS)return dt(!1,"SHARP_IGNORE_GLOBAL_LIBVIPS",e);if(process.env.SHARP_FORCE_GLOBAL_LIBVIPS)return dt(!0,"SHARP_FORCE_GLOBAL_LIBVIPS",e);if(us())return dt(!1,"Rosetta",e);let t=ii();return!!t&&ts(t,ei)};ai.exports={minimumLibvipsVersion:ei,prebuiltPlatforms:ss,buildPlatformArch:oe,buildSharpLibvipsIncludeDir:cs,buildSharpLibvipsCPlusPlusDir:ds,buildSharpLibvipsLibDir:fs,isUnsupportedNodeRuntime:hs,runtimePlatformArch:ls,log:os,yarnLocator:ms,spawnRebuild:ps,globalLibvipsVersion:ii,pkgConfigPath:ni,useGlobalLibvips:gs}});var be=v((ac,oi)=>{"use strict";var{familySync:bs,versionSync:vs}=$e(),{runtimePlatformArch:ws,isUnsupportedNodeRuntime:si,prebuiltPlatforms:ys,minimumLibvipsVersion:Es}=ft(),ee=ws(),xs=[`../src/build/Release/sharp-${ee}.node`,"../src/build/Release/sharp-wasm32.node",`@img/sharp-${ee}/sharp.node`,"@img/sharp-wasm32/sharp.node"],ht,_e=[];for(let e of xs)try{ht=require(e);break}catch(t){_e.push(t)}if(ht)oi.exports=ht;else{let[e,t,r]=["linux","darwin","win32"].map(s=>ee.startsWith(s)),i=[`Could not load the "sharp" module using the ${ee} runtime`];_e.forEach(s=>{s.code!=="MODULE_NOT_FOUND"&&i.push(`${s.code}: ${s.message}`)});let n=_e.map(s=>s.message).join(" ");if(i.push("Possible solutions:"),si()){let{found:s,expected:o}=si();i.push("- Please upgrade Node.js:",`    Found ${s}`,`    Requires ${o}`)}else if(ys.includes(ee)){let[s,o]=ee.split("-"),l=s.endsWith("musl")?" --libc=musl":"";i.push("- Ensure optional dependencies can be installed:","    npm install --include=optional sharp","- Ensure your package manager supports multi-platform installation:","    See https://sharp.pixelplumbing.com/install#cross-platform","- Add platform-specific dependencies:",`    npm install --os=${s.replace("musl","")}${l} --cpu=${o} sharp`)}else i.push(`- Manually install libvips >= ${Es}`,"- Add experimental WebAssembly-based dependencies:","    npm install --cpu=wasm32 sharp","    npm install @img/sharp-wasm32");if(e&&/(symbol not found|CXXABI_)/i.test(n))try{let{config:s}=require(`@img/sharp-libvips-${ee}/package`),o=`${bs()} ${vs()}`,l=`${s.musl?"musl":"glibc"} ${s.musl||s.glibc}`;i.push("- Update your OS:",`    Found ${o}`,`    Requires ${l}`)}catch{}throw e&&/\/snap\/core[0-9]{2}/.test(n)&&i.push("- Remove the Node.js Snap, which does not support native modules","    snap remove node"),t&&/Incompatible library version/.test(n)&&i.push("- Update Homebrew:","    brew update && brew upgrade vips"),_e.some(s=>s.code==="ERR_DLOPEN_DISABLED")&&i.push("- Run Node.js without using the --no-addons flag"),r&&/The specified procedure could not be found/.test(n)&&i.push("- Using the canvas package on Windows?","    See https://sharp.pixelplumbing.com/install#canvas-and-windows","- Check for outdated versions of sharp in the dependency tree:","    npm ls sharp"),i.push("- Consult the installation documentation:","    See https://sharp.pixelplumbing.com/install"),new Error(i.join(`
`))}});var ci=v((sc,li)=>{"use strict";var Ps=require("node:util"),ut=require("node:stream"),Is=_();be();var ks=Ps.debuglog("sharp"),te=function(e,t){if(arguments.length===1&&!Is.defined(e))throw new Error("Invalid input");return this instanceof te?(ut.Duplex.call(this),this.options={topOffsetPre:-1,leftOffsetPre:-1,widthPre:-1,heightPre:-1,topOffsetPost:-1,leftOffsetPost:-1,widthPost:-1,heightPost:-1,width:-1,height:-1,canvas:"crop",position:0,resizeBackground:[0,0,0,255],useExifOrientation:!1,angle:0,rotationAngle:0,rotationBackground:[0,0,0,255],rotateBeforePreExtract:!1,flip:!1,flop:!1,extendTop:0,extendBottom:0,extendLeft:0,extendRight:0,extendBackground:[0,0,0,255],extendWith:"background",withoutEnlargement:!1,withoutReduction:!1,affineMatrix:[],affineBackground:[0,0,0,255],affineIdx:0,affineIdy:0,affineOdx:0,affineOdy:0,affineInterpolator:this.constructor.interpolators.bilinear,kernel:"lanczos3",fastShrinkOnLoad:!0,tint:[-1,0,0,0],flatten:!1,flattenBackground:[0,0,0],unflatten:!1,negate:!1,negateAlpha:!0,medianSize:0,blurSigma:0,precision:"integer",minAmpl:.2,sharpenSigma:0,sharpenM1:1,sharpenM2:2,sharpenX1:2,sharpenY2:10,sharpenY3:20,threshold:0,thresholdGrayscale:!0,trimBackground:[],trimThreshold:-1,trimLineArt:!1,gamma:0,gammaOut:0,greyscale:!1,normalise:!1,normaliseLower:1,normaliseUpper:99,claheWidth:0,claheHeight:0,claheMaxSlope:3,brightness:1,saturation:1,hue:0,lightness:0,booleanBufferIn:null,booleanFileIn:"",joinChannelIn:[],extractChannel:-1,removeAlpha:!1,ensureAlpha:-1,colourspace:"srgb",colourspacePipeline:"last",composite:[],fileOut:"",formatOut:"input",streamOut:!1,keepMetadata:0,withMetadataOrientation:-1,withMetadataDensity:0,withIccProfile:"",withExif:{},withExifMerge:!0,resolveWithObject:!1,jpegQuality:80,jpegProgressive:!1,jpegChromaSubsampling:"4:2:0",jpegTrellisQuantisation:!1,jpegOvershootDeringing:!1,jpegOptimiseScans:!1,jpegOptimiseCoding:!0,jpegQuantisationTable:0,pngProgressive:!1,pngCompressionLevel:6,pngAdaptiveFiltering:!1,pngPalette:!1,pngQuality:100,pngEffort:7,pngBitdepth:8,pngDither:1,jp2Quality:80,jp2TileHeight:512,jp2TileWidth:512,jp2Lossless:!1,jp2ChromaSubsampling:"4:4:4",webpQuality:80,webpAlphaQuality:100,webpLossless:!1,webpNearLossless:!1,webpSmartSubsample:!1,webpPreset:"default",webpEffort:4,webpMinSize:!1,webpMixed:!1,gifBitdepth:8,gifEffort:7,gifDither:1,gifInterFrameMaxError:0,gifInterPaletteMaxError:3,gifReuse:!0,gifProgressive:!1,tiffQuality:80,tiffCompression:"jpeg",tiffPredictor:"horizontal",tiffPyramid:!1,tiffMiniswhite:!1,tiffBitdepth:8,tiffTile:!1,tiffTileHeight:256,tiffTileWidth:256,tiffXres:1,tiffYres:1,tiffResolutionUnit:"inch",heifQuality:50,heifLossless:!1,heifCompression:"av1",heifEffort:4,heifChromaSubsampling:"4:4:4",heifBitdepth:8,jxlDistance:1,jxlDecodingTier:0,jxlEffort:7,jxlLossless:!1,rawDepth:"uchar",tileSize:256,tileOverlap:0,tileContainer:"fs",tileLayout:"dz",tileFormat:"last",tileDepth:"last",tileAngle:0,tileSkipBlanks:-1,tileBackground:[255,255,255,255],tileCentre:!1,tileId:"https://example.com/iiif",tileBasename:"",timeoutSeconds:0,linearA:[],linearB:[],debuglog:r=>{this.emit("warning",r),ks(r)},queueListener:function(r){te.queue.emit("change",r)}},this.options.input=this._createInputDescriptor(e,t,{allowStream:!0}),this):new te(e,t)};Object.setPrototypeOf(te.prototype,ut.Duplex.prototype);Object.setPrototypeOf(te,ut.Duplex);function Rs(){let e=this.constructor.call(),{debuglog:t,queueListener:r,...i}=this.options;return e.options=structuredClone(i),e.options.debuglog=t,e.options.queueListener=r,this._isStreamInput()&&this.on("finish",()=>{this._flattenBufferIn(),e.options.input.buffer=this.options.input.buffer,e.emit("finish")}),e}Object.assign(te.prototype,{clone:Rs});li.exports=te});var mt=v((oc,di)=>{"use strict";di.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var hi=v((lc,fi)=>{fi.exports=function(t){return!t||typeof t=="string"?!1:t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&t.constructor.name!=="String")}});var pi=v((cc,mi)=>{"use strict";var js=hi(),As=Array.prototype.concat,Ss=Array.prototype.slice,ui=mi.exports=function(t){for(var r=[],i=0,n=t.length;i<n;i++){var s=t[i];js(s)?r=As.call(r,Ss.call(s)):r.push(s)}return r};ui.wrap=function(e){return function(){return e(ui(arguments))}}});var wi=v((dc,vi)=>{var ve=mt(),we=pi(),gi=Object.hasOwnProperty,bi=Object.create(null);for(De in ve)gi.call(ve,De)&&(bi[ve[De]]=De);var De,B=vi.exports={to:{},get:{}};B.get=function(e){var t=e.substring(0,3).toLowerCase(),r,i;switch(t){case"hsl":r=B.get.hsl(e),i="hsl";break;case"hwb":r=B.get.hwb(e),i="hwb";break;default:r=B.get.rgb(e),i="rgb";break}return r?{model:i,value:r}:null};B.get.rgb=function(e){if(!e)return null;var t=/^#([a-f0-9]{3,4})$/i,r=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,i=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,n=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,s=/^(\w+)$/,o=[0,0,0,1],l,d,h;if(l=e.match(r)){for(h=l[2],l=l[1],d=0;d<3;d++){var b=d*2;o[d]=parseInt(l.slice(b,b+2),16)}h&&(o[3]=parseInt(h,16)/255)}else if(l=e.match(t)){for(l=l[1],h=l[3],d=0;d<3;d++)o[d]=parseInt(l[d]+l[d],16);h&&(o[3]=parseInt(h+h,16)/255)}else if(l=e.match(i)){for(d=0;d<3;d++)o[d]=parseInt(l[d+1],0);l[4]&&(l[5]?o[3]=parseFloat(l[4])*.01:o[3]=parseFloat(l[4]))}else if(l=e.match(n)){for(d=0;d<3;d++)o[d]=Math.round(parseFloat(l[d+1])*2.55);l[4]&&(l[5]?o[3]=parseFloat(l[4])*.01:o[3]=parseFloat(l[4]))}else return(l=e.match(s))?l[1]==="transparent"?[0,0,0,0]:gi.call(ve,l[1])?(o=ve[l[1]],o[3]=1,o):null:null;for(d=0;d<3;d++)o[d]=Q(o[d],0,255);return o[3]=Q(o[3],0,1),o};B.get.hsl=function(e){if(!e)return null;var t=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,r=e.match(t);if(r){var i=parseFloat(r[4]),n=(parseFloat(r[1])%360+360)%360,s=Q(parseFloat(r[2]),0,100),o=Q(parseFloat(r[3]),0,100),l=Q(isNaN(i)?1:i,0,1);return[n,s,o,l]}return null};B.get.hwb=function(e){if(!e)return null;var t=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,r=e.match(t);if(r){var i=parseFloat(r[4]),n=(parseFloat(r[1])%360+360)%360,s=Q(parseFloat(r[2]),0,100),o=Q(parseFloat(r[3]),0,100),l=Q(isNaN(i)?1:i,0,1);return[n,s,o,l]}return null};B.to.hex=function(){var e=we(arguments);return"#"+ze(e[0])+ze(e[1])+ze(e[2])+(e[3]<1?ze(Math.round(e[3]*255)):"")};B.to.rgb=function(){var e=we(arguments);return e.length<4||e[3]===1?"rgb("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+")":"rgba("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+", "+e[3]+")"};B.to.rgb.percent=function(){var e=we(arguments),t=Math.round(e[0]/255*100),r=Math.round(e[1]/255*100),i=Math.round(e[2]/255*100);return e.length<4||e[3]===1?"rgb("+t+"%, "+r+"%, "+i+"%)":"rgba("+t+"%, "+r+"%, "+i+"%, "+e[3]+")"};B.to.hsl=function(){var e=we(arguments);return e.length<4||e[3]===1?"hsl("+e[0]+", "+e[1]+"%, "+e[2]+"%)":"hsla("+e[0]+", "+e[1]+"%, "+e[2]+"%, "+e[3]+")"};B.to.hwb=function(){var e=we(arguments),t="";return e.length>=4&&e[3]!==1&&(t=", "+e[3]),"hwb("+e[0]+", "+e[1]+"%, "+e[2]+"%"+t+")"};B.to.keyword=function(e){return bi[e.slice(0,3)]};function Q(e,t,r){return Math.min(Math.max(t,e),r)}function ze(e){var t=Math.round(e).toString(16).toUpperCase();return t.length<2?"0"+t:t}});var pt=v((fc,Ei)=>{var ye=mt(),yi={};for(let e of Object.keys(ye))yi[ye[e]]=e;var p={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};Ei.exports=p;for(let e of Object.keys(p)){if(!("channels"in p[e]))throw new Error("missing channels property: "+e);if(!("labels"in p[e]))throw new Error("missing channel labels property: "+e);if(p[e].labels.length!==p[e].channels)throw new Error("channel and label counts mismatch: "+e);let{channels:t,labels:r}=p[e];delete p[e].channels,delete p[e].labels,Object.defineProperty(p[e],"channels",{value:t}),Object.defineProperty(p[e],"labels",{value:r})}p.rgb.hsl=function(e){let t=e[0]/255,r=e[1]/255,i=e[2]/255,n=Math.min(t,r,i),s=Math.max(t,r,i),o=s-n,l,d;s===n?l=0:t===s?l=(r-i)/o:r===s?l=2+(i-t)/o:i===s&&(l=4+(t-r)/o),l=Math.min(l*60,360),l<0&&(l+=360);let h=(n+s)/2;return s===n?d=0:h<=.5?d=o/(s+n):d=o/(2-s-n),[l,d*100,h*100]};p.rgb.hsv=function(e){let t,r,i,n,s,o=e[0]/255,l=e[1]/255,d=e[2]/255,h=Math.max(o,l,d),b=h-Math.min(o,l,d),w=function(O){return(h-O)/6/b+1/2};return b===0?(n=0,s=0):(s=b/h,t=w(o),r=w(l),i=w(d),o===h?n=i-r:l===h?n=1/3+t-i:d===h&&(n=2/3+r-t),n<0?n+=1:n>1&&(n-=1)),[n*360,s*100,h*100]};p.rgb.hwb=function(e){let t=e[0],r=e[1],i=e[2],n=p.rgb.hsl(e)[0],s=1/255*Math.min(t,Math.min(r,i));return i=1-1/255*Math.max(t,Math.max(r,i)),[n,s*100,i*100]};p.rgb.cmyk=function(e){let t=e[0]/255,r=e[1]/255,i=e[2]/255,n=Math.min(1-t,1-r,1-i),s=(1-t-n)/(1-n)||0,o=(1-r-n)/(1-n)||0,l=(1-i-n)/(1-n)||0;return[s*100,o*100,l*100,n*100]};function $s(e,t){return(e[0]-t[0])**2+(e[1]-t[1])**2+(e[2]-t[2])**2}p.rgb.keyword=function(e){let t=yi[e];if(t)return t;let r=1/0,i;for(let n of Object.keys(ye)){let s=ye[n],o=$s(e,s);o<r&&(r=o,i=n)}return i};p.keyword.rgb=function(e){return ye[e]};p.rgb.xyz=function(e){let t=e[0]/255,r=e[1]/255,i=e[2]/255;t=t>.04045?((t+.055)/1.055)**2.4:t/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,i=i>.04045?((i+.055)/1.055)**2.4:i/12.92;let n=t*.4124+r*.3576+i*.1805,s=t*.2126+r*.7152+i*.0722,o=t*.0193+r*.1192+i*.9505;return[n*100,s*100,o*100]};p.rgb.lab=function(e){let t=p.rgb.xyz(e),r=t[0],i=t[1],n=t[2];r/=95.047,i/=100,n/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,i=i>.008856?i**(1/3):7.787*i+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;let s=116*i-16,o=500*(r-i),l=200*(i-n);return[s,o,l]};p.hsl.rgb=function(e){let t=e[0]/360,r=e[1]/100,i=e[2]/100,n,s,o;if(r===0)return o=i*255,[o,o,o];i<.5?n=i*(1+r):n=i+r-i*r;let l=2*i-n,d=[0,0,0];for(let h=0;h<3;h++)s=t+1/3*-(h-1),s<0&&s++,s>1&&s--,6*s<1?o=l+(n-l)*6*s:2*s<1?o=n:3*s<2?o=l+(n-l)*(2/3-s)*6:o=l,d[h]=o*255;return d};p.hsl.hsv=function(e){let t=e[0],r=e[1]/100,i=e[2]/100,n=r,s=Math.max(i,.01);i*=2,r*=i<=1?i:2-i,n*=s<=1?s:2-s;let o=(i+r)/2,l=i===0?2*n/(s+n):2*r/(i+r);return[t,l*100,o*100]};p.hsv.rgb=function(e){let t=e[0]/60,r=e[1]/100,i=e[2]/100,n=Math.floor(t)%6,s=t-Math.floor(t),o=255*i*(1-r),l=255*i*(1-r*s),d=255*i*(1-r*(1-s));switch(i*=255,n){case 0:return[i,d,o];case 1:return[l,i,o];case 2:return[o,i,d];case 3:return[o,l,i];case 4:return[d,o,i];case 5:return[i,o,l]}};p.hsv.hsl=function(e){let t=e[0],r=e[1]/100,i=e[2]/100,n=Math.max(i,.01),s,o;o=(2-r)*i;let l=(2-r)*n;return s=r*n,s/=l<=1?l:2-l,s=s||0,o/=2,[t,s*100,o*100]};p.hwb.rgb=function(e){let t=e[0]/360,r=e[1]/100,i=e[2]/100,n=r+i,s;n>1&&(r/=n,i/=n);let o=Math.floor(6*t),l=1-i;s=6*t-o,o&1&&(s=1-s);let d=r+s*(l-r),h,b,w;switch(o){default:case 6:case 0:h=l,b=d,w=r;break;case 1:h=d,b=l,w=r;break;case 2:h=r,b=l,w=d;break;case 3:h=r,b=d,w=l;break;case 4:h=d,b=r,w=l;break;case 5:h=l,b=r,w=d;break}return[h*255,b*255,w*255]};p.cmyk.rgb=function(e){let t=e[0]/100,r=e[1]/100,i=e[2]/100,n=e[3]/100,s=1-Math.min(1,t*(1-n)+n),o=1-Math.min(1,r*(1-n)+n),l=1-Math.min(1,i*(1-n)+n);return[s*255,o*255,l*255]};p.xyz.rgb=function(e){let t=e[0]/100,r=e[1]/100,i=e[2]/100,n,s,o;return n=t*3.2406+r*-1.5372+i*-.4986,s=t*-.9689+r*1.8758+i*.0415,o=t*.0557+r*-.204+i*1.057,n=n>.0031308?1.055*n**(1/2.4)-.055:n*12.92,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,n=Math.min(Math.max(0,n),1),s=Math.min(Math.max(0,s),1),o=Math.min(Math.max(0,o),1),[n*255,s*255,o*255]};p.xyz.lab=function(e){let t=e[0],r=e[1],i=e[2];t/=95.047,r/=100,i/=108.883,t=t>.008856?t**(1/3):7.787*t+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;let n=116*r-16,s=500*(t-r),o=200*(r-i);return[n,s,o]};p.lab.xyz=function(e){let t=e[0],r=e[1],i=e[2],n,s,o;s=(t+16)/116,n=r/500+s,o=s-i/200;let l=s**3,d=n**3,h=o**3;return s=l>.008856?l:(s-16/116)/7.787,n=d>.008856?d:(n-16/116)/7.787,o=h>.008856?h:(o-16/116)/7.787,n*=95.047,s*=100,o*=108.883,[n,s,o]};p.lab.lch=function(e){let t=e[0],r=e[1],i=e[2],n;n=Math.atan2(i,r)*360/2/Math.PI,n<0&&(n+=360);let o=Math.sqrt(r*r+i*i);return[t,o,n]};p.lch.lab=function(e){let t=e[0],r=e[1],n=e[2]/360*2*Math.PI,s=r*Math.cos(n),o=r*Math.sin(n);return[t,s,o]};p.rgb.ansi16=function(e,t=null){let[r,i,n]=e,s=t===null?p.rgb.hsv(e)[2]:t;if(s=Math.round(s/50),s===0)return 30;let o=30+(Math.round(n/255)<<2|Math.round(i/255)<<1|Math.round(r/255));return s===2&&(o+=60),o};p.hsv.ansi16=function(e){return p.rgb.ansi16(p.hsv.rgb(e),e[2])};p.rgb.ansi256=function(e){let t=e[0],r=e[1],i=e[2];return t===r&&r===i?t<8?16:t>248?231:Math.round((t-8)/247*24)+232:16+36*Math.round(t/255*5)+6*Math.round(r/255*5)+Math.round(i/255*5)};p.ansi16.rgb=function(e){let t=e%10;if(t===0||t===7)return e>50&&(t+=3.5),t=t/10.5*255,[t,t,t];let r=(~~(e>50)+1)*.5,i=(t&1)*r*255,n=(t>>1&1)*r*255,s=(t>>2&1)*r*255;return[i,n,s]};p.ansi256.rgb=function(e){if(e>=232){let s=(e-232)*10+8;return[s,s,s]}e-=16;let t,r=Math.floor(e/36)/5*255,i=Math.floor((t=e%36)/6)/5*255,n=t%6/5*255;return[r,i,n]};p.rgb.hex=function(e){let r=(((Math.round(e[0])&255)<<16)+((Math.round(e[1])&255)<<8)+(Math.round(e[2])&255)).toString(16).toUpperCase();return"000000".substring(r.length)+r};p.hex.rgb=function(e){let t=e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!t)return[0,0,0];let r=t[0];t[0].length===3&&(r=r.split("").map(l=>l+l).join(""));let i=parseInt(r,16),n=i>>16&255,s=i>>8&255,o=i&255;return[n,s,o]};p.rgb.hcg=function(e){let t=e[0]/255,r=e[1]/255,i=e[2]/255,n=Math.max(Math.max(t,r),i),s=Math.min(Math.min(t,r),i),o=n-s,l,d;return o<1?l=s/(1-o):l=0,o<=0?d=0:n===t?d=(r-i)/o%6:n===r?d=2+(i-t)/o:d=4+(t-r)/o,d/=6,d%=1,[d*360,o*100,l*100]};p.hsl.hcg=function(e){let t=e[1]/100,r=e[2]/100,i=r<.5?2*t*r:2*t*(1-r),n=0;return i<1&&(n=(r-.5*i)/(1-i)),[e[0],i*100,n*100]};p.hsv.hcg=function(e){let t=e[1]/100,r=e[2]/100,i=t*r,n=0;return i<1&&(n=(r-i)/(1-i)),[e[0],i*100,n*100]};p.hcg.rgb=function(e){let t=e[0]/360,r=e[1]/100,i=e[2]/100;if(r===0)return[i*255,i*255,i*255];let n=[0,0,0],s=t%1*6,o=s%1,l=1-o,d=0;switch(Math.floor(s)){case 0:n[0]=1,n[1]=o,n[2]=0;break;case 1:n[0]=l,n[1]=1,n[2]=0;break;case 2:n[0]=0,n[1]=1,n[2]=o;break;case 3:n[0]=0,n[1]=l,n[2]=1;break;case 4:n[0]=o,n[1]=0,n[2]=1;break;default:n[0]=1,n[1]=0,n[2]=l}return d=(1-r)*i,[(r*n[0]+d)*255,(r*n[1]+d)*255,(r*n[2]+d)*255]};p.hcg.hsv=function(e){let t=e[1]/100,r=e[2]/100,i=t+r*(1-t),n=0;return i>0&&(n=t/i),[e[0],n*100,i*100]};p.hcg.hsl=function(e){let t=e[1]/100,i=e[2]/100*(1-t)+.5*t,n=0;return i>0&&i<.5?n=t/(2*i):i>=.5&&i<1&&(n=t/(2*(1-i))),[e[0],n*100,i*100]};p.hcg.hwb=function(e){let t=e[1]/100,r=e[2]/100,i=t+r*(1-t);return[e[0],(i-t)*100,(1-i)*100]};p.hwb.hcg=function(e){let t=e[1]/100,i=1-e[2]/100,n=i-t,s=0;return n<1&&(s=(i-n)/(1-n)),[e[0],n*100,s*100]};p.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]};p.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]};p.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]};p.gray.hsl=function(e){return[0,0,e[0]]};p.gray.hsv=p.gray.hsl;p.gray.hwb=function(e){return[0,100,e[0]]};p.gray.cmyk=function(e){return[0,0,0,e[0]]};p.gray.lab=function(e){return[e[0],0,0]};p.gray.hex=function(e){let t=Math.round(e[0]/100*255)&255,i=((t<<16)+(t<<8)+t).toString(16).toUpperCase();return"000000".substring(i.length)+i};p.rgb.gray=function(e){return[(e[0]+e[1]+e[2])/3/255*100]}});var Pi=v((hc,xi)=>{var Ue=pt();function Ls(){let e={},t=Object.keys(Ue);for(let r=t.length,i=0;i<r;i++)e[t[i]]={distance:-1,parent:null};return e}function Fs(e){let t=Ls(),r=[e];for(t[e].distance=0;r.length;){let i=r.pop(),n=Object.keys(Ue[i]);for(let s=n.length,o=0;o<s;o++){let l=n[o],d=t[l];d.distance===-1&&(d.distance=t[i].distance+1,d.parent=i,r.unshift(l))}}return t}function Ns(e,t){return function(r){return t(e(r))}}function Cs(e,t){let r=[t[e].parent,e],i=Ue[t[e].parent][e],n=t[e].parent;for(;t[n].parent;)r.unshift(t[n].parent),i=Ns(Ue[t[n].parent][n],i),n=t[n].parent;return i.conversion=r,i}xi.exports=function(e){let t=Fs(e),r={},i=Object.keys(t);for(let n=i.length,s=0;s<n;s++){let o=i[s];t[o].parent!==null&&(r[o]=Cs(o,t))}return r}});var ki=v((uc,Ii)=>{var gt=pt(),Bs=Pi(),le={},Ts=Object.keys(gt);function Ms(e){let t=function(...r){let i=r[0];return i==null?i:(i.length>1&&(r=i),e(r))};return"conversion"in e&&(t.conversion=e.conversion),t}function Os(e){let t=function(...r){let i=r[0];if(i==null)return i;i.length>1&&(r=i);let n=e(r);if(typeof n=="object")for(let s=n.length,o=0;o<s;o++)n[o]=Math.round(n[o]);return n};return"conversion"in e&&(t.conversion=e.conversion),t}Ts.forEach(e=>{le[e]={},Object.defineProperty(le[e],"channels",{value:gt[e].channels}),Object.defineProperty(le[e],"labels",{value:gt[e].labels});let t=Bs(e);Object.keys(t).forEach(i=>{let n=t[i];le[e][i]=Os(n),le[e][i].raw=Ms(n)})});Ii.exports=le});var We=v((mc,ji)=>{var ce=wi(),T=ki(),Ri=["keyword","gray","hex"],bt={};for(let e of Object.keys(T))bt[[...T[e].labels].sort().join("")]=e;var Ge={};function A(e,t){if(!(this instanceof A))return new A(e,t);if(t&&t in Ri&&(t=null),t&&!(t in T))throw new Error("Unknown model: "+t);let r,i;if(e==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(e instanceof A)this.model=e.model,this.color=[...e.color],this.valpha=e.valpha;else if(typeof e=="string"){let n=ce.get(e);if(n===null)throw new Error("Unable to parse color from string: "+e);this.model=n.model,i=T[this.model].channels,this.color=n.value.slice(0,i),this.valpha=typeof n.value[i]=="number"?n.value[i]:1}else if(e.length>0){this.model=t||"rgb",i=T[this.model].channels;let n=Array.prototype.slice.call(e,0,i);this.color=vt(n,i),this.valpha=typeof e[i]=="number"?e[i]:1}else if(typeof e=="number")this.model="rgb",this.color=[e>>16&255,e>>8&255,e&255],this.valpha=1;else{this.valpha=1;let n=Object.keys(e);"alpha"in e&&(n.splice(n.indexOf("alpha"),1),this.valpha=typeof e.alpha=="number"?e.alpha:0);let s=n.sort().join("");if(!(s in bt))throw new Error("Unable to parse color from object: "+JSON.stringify(e));this.model=bt[s];let{labels:o}=T[this.model],l=[];for(r=0;r<o.length;r++)l.push(e[o[r]]);this.color=vt(l)}if(Ge[this.model])for(i=T[this.model].channels,r=0;r<i;r++){let n=Ge[this.model][r];n&&(this.color[r]=n(this.color[r]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}A.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(e){let t=this.model in ce.to?this:this.rgb();t=t.round(typeof e=="number"?e:1);let r=t.valpha===1?t.color:[...t.color,this.valpha];return ce.to[t.model](r)},percentString(e){let t=this.rgb().round(typeof e=="number"?e:1),r=t.valpha===1?t.color:[...t.color,this.valpha];return ce.to.rgb.percent(r)},array(){return this.valpha===1?[...this.color]:[...this.color,this.valpha]},object(){let e={},{channels:t}=T[this.model],{labels:r}=T[this.model];for(let i=0;i<t;i++)e[r[i]]=this.color[i];return this.valpha!==1&&(e.alpha=this.valpha),e},unitArray(){let e=this.rgb().color;return e[0]/=255,e[1]/=255,e[2]/=255,this.valpha!==1&&e.push(this.valpha),e},unitObject(){let e=this.rgb().object();return e.r/=255,e.g/=255,e.b/=255,this.valpha!==1&&(e.alpha=this.valpha),e},round(e){return e=Math.max(e||0,0),new A([...this.color.map(_s(e)),this.valpha],this.model)},alpha(e){return e!==void 0?new A([...this.color,Math.max(0,Math.min(1,e))],this.model):this.valpha},red:P("rgb",0,k(255)),green:P("rgb",1,k(255)),blue:P("rgb",2,k(255)),hue:P(["hsl","hsv","hsl","hwb","hcg"],0,e=>(e%360+360)%360),saturationl:P("hsl",1,k(100)),lightness:P("hsl",2,k(100)),saturationv:P("hsv",1,k(100)),value:P("hsv",2,k(100)),chroma:P("hcg",1,k(100)),gray:P("hcg",2,k(100)),white:P("hwb",1,k(100)),wblack:P("hwb",2,k(100)),cyan:P("cmyk",0,k(100)),magenta:P("cmyk",1,k(100)),yellow:P("cmyk",2,k(100)),black:P("cmyk",3,k(100)),x:P("xyz",0,k(95.047)),y:P("xyz",1,k(100)),z:P("xyz",2,k(108.833)),l:P("lab",0,k(100)),a:P("lab",1),b:P("lab",2),keyword(e){return e!==void 0?new A(e):T[this.model].keyword(this.color)},hex(e){return e!==void 0?new A(e):ce.to.hex(this.rgb().round().color)},hexa(e){if(e!==void 0)return new A(e);let t=this.rgb().round().color,r=Math.round(this.valpha*255).toString(16).toUpperCase();return r.length===1&&(r="0"+r),ce.to.hex(t)+r},rgbNumber(){let e=this.rgb().color;return(e[0]&255)<<16|(e[1]&255)<<8|e[2]&255},luminosity(){let e=this.rgb().color,t=[];for(let[r,i]of e.entries()){let n=i/255;t[r]=n<=.04045?n/12.92:((n+.055)/1.055)**2.4}return .2126*t[0]+.7152*t[1]+.0722*t[2]},contrast(e){let t=this.luminosity(),r=e.luminosity();return t>r?(t+.05)/(r+.05):(r+.05)/(t+.05)},level(e){let t=this.contrast(e);return t>=7?"AAA":t>=4.5?"AA":""},isDark(){let e=this.rgb().color;return(e[0]*2126+e[1]*7152+e[2]*722)/1e4<128},isLight(){return!this.isDark()},negate(){let e=this.rgb();for(let t=0;t<3;t++)e.color[t]=255-e.color[t];return e},lighten(e){let t=this.hsl();return t.color[2]+=t.color[2]*e,t},darken(e){let t=this.hsl();return t.color[2]-=t.color[2]*e,t},saturate(e){let t=this.hsl();return t.color[1]+=t.color[1]*e,t},desaturate(e){let t=this.hsl();return t.color[1]-=t.color[1]*e,t},whiten(e){let t=this.hwb();return t.color[1]+=t.color[1]*e,t},blacken(e){let t=this.hwb();return t.color[2]+=t.color[2]*e,t},grayscale(){let e=this.rgb().color,t=e[0]*.3+e[1]*.59+e[2]*.11;return A.rgb(t,t,t)},fade(e){return this.alpha(this.valpha-this.valpha*e)},opaquer(e){return this.alpha(this.valpha+this.valpha*e)},rotate(e){let t=this.hsl(),r=t.color[0];return r=(r+e)%360,r=r<0?360+r:r,t.color[0]=r,t},mix(e,t){if(!e||!e.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof e);let r=e.rgb(),i=this.rgb(),n=t===void 0?.5:t,s=2*n-1,o=r.alpha()-i.alpha(),l=((s*o===-1?s:(s+o)/(1+s*o))+1)/2,d=1-l;return A.rgb(l*r.red()+d*i.red(),l*r.green()+d*i.green(),l*r.blue()+d*i.blue(),r.alpha()*n+i.alpha()*(1-n))}};for(let e of Object.keys(T)){if(Ri.includes(e))continue;let{channels:t}=T[e];A.prototype[e]=function(...r){return this.model===e?new A(this):r.length>0?new A(r,e):new A([...Ds(T[this.model][e].raw(this.color)),this.valpha],e)},A[e]=function(...r){let i=r[0];return typeof i=="number"&&(i=vt(r,t)),new A(i,e)}}function qs(e,t){return Number(e.toFixed(t))}function _s(e){return function(t){return qs(t,e)}}function P(e,t,r){e=Array.isArray(e)?e:[e];for(let i of e)(Ge[i]||(Ge[i]=[]))[t]=r;return e=e[0],function(i){let n;return i!==void 0?(r&&(i=r(i)),n=this[e](),n.color[t]=i,n):(n=this[e]().color[t],r&&(n=r(n)),n)}}function k(e){return function(t){return Math.max(0,Math.min(e,t))}}function Ds(e){return Array.isArray(e)?e:[e]}function vt(e,t){for(let r=0;r<t;r++)typeof e[r]!="number"&&(e[r]=0);return e}ji.exports=A});var $i=v((pc,Si)=>{"use strict";var zs=We(),f=_(),J=be(),Us={left:"low",center:"centre",centre:"centre",right:"high"};function Ai(e){let{raw:t,density:r,limitInputPixels:i,ignoreIcc:n,unlimited:s,sequentialRead:o,failOn:l,failOnError:d,animated:h,page:b,pages:w,subifd:O}=e;return[t,r,i,n,s,o,l,d,h,b,w,O].some(f.defined)?{raw:t,density:r,limitInputPixels:i,ignoreIcc:n,unlimited:s,sequentialRead:o,failOn:l,failOnError:d,animated:h,page:b,pages:w,subifd:O}:void 0}function Gs(e,t,r){let i={failOn:"warning",limitInputPixels:Math.pow(16383,2),ignoreIcc:!1,unlimited:!1,sequentialRead:!0};if(f.string(e))i.file=e;else if(f.buffer(e)){if(e.length===0)throw Error("Input Buffer is empty");i.buffer=e}else if(f.arrayBuffer(e)){if(e.byteLength===0)throw Error("Input bit Array is empty");i.buffer=Buffer.from(e,0,e.byteLength)}else if(f.typedArray(e)){if(e.length===0)throw Error("Input Bit Array is empty");i.buffer=Buffer.from(e.buffer,e.byteOffset,e.byteLength)}else if(f.plainObject(e)&&!f.defined(t))t=e,Ai(t)&&(i.buffer=[]);else if(!f.defined(e)&&!f.defined(t)&&f.object(r)&&r.allowStream)i.buffer=[];else throw new Error(`Unsupported input '${e}' of type ${typeof e}${f.defined(t)?` when also providing options of type ${typeof t}`:""}`);if(f.object(t)){if(f.defined(t.failOnError))if(f.bool(t.failOnError))i.failOn=t.failOnError?"warning":"none";else throw f.invalidParameterError("failOnError","boolean",t.failOnError);if(f.defined(t.failOn))if(f.string(t.failOn)&&f.inArray(t.failOn,["none","truncated","error","warning"]))i.failOn=t.failOn;else throw f.invalidParameterError("failOn","one of: none, truncated, error, warning",t.failOn);if(f.defined(t.density))if(f.inRange(t.density,1,1e5))i.density=t.density;else throw f.invalidParameterError("density","number between 1 and 100000",t.density);if(f.defined(t.ignoreIcc))if(f.bool(t.ignoreIcc))i.ignoreIcc=t.ignoreIcc;else throw f.invalidParameterError("ignoreIcc","boolean",t.ignoreIcc);if(f.defined(t.limitInputPixels))if(f.bool(t.limitInputPixels))i.limitInputPixels=t.limitInputPixels?Math.pow(16383,2):0;else if(f.integer(t.limitInputPixels)&&f.inRange(t.limitInputPixels,0,Number.MAX_SAFE_INTEGER))i.limitInputPixels=t.limitInputPixels;else throw f.invalidParameterError("limitInputPixels","positive integer",t.limitInputPixels);if(f.defined(t.unlimited))if(f.bool(t.unlimited))i.unlimited=t.unlimited;else throw f.invalidParameterError("unlimited","boolean",t.unlimited);if(f.defined(t.sequentialRead))if(f.bool(t.sequentialRead))i.sequentialRead=t.sequentialRead;else throw f.invalidParameterError("sequentialRead","boolean",t.sequentialRead);if(f.defined(t.raw))if(f.object(t.raw)&&f.integer(t.raw.width)&&t.raw.width>0&&f.integer(t.raw.height)&&t.raw.height>0&&f.integer(t.raw.channels)&&f.inRange(t.raw.channels,1,4))switch(i.rawWidth=t.raw.width,i.rawHeight=t.raw.height,i.rawChannels=t.raw.channels,i.rawPremultiplied=!!t.raw.premultiplied,e.constructor){case Uint8Array:case Uint8ClampedArray:i.rawDepth="uchar";break;case Int8Array:i.rawDepth="char";break;case Uint16Array:i.rawDepth="ushort";break;case Int16Array:i.rawDepth="short";break;case Uint32Array:i.rawDepth="uint";break;case Int32Array:i.rawDepth="int";break;case Float32Array:i.rawDepth="float";break;case Float64Array:i.rawDepth="double";break;default:i.rawDepth="uchar";break}else throw new Error("Expected width, height and channels for raw pixel input");if(f.defined(t.animated))if(f.bool(t.animated))i.pages=t.animated?-1:1;else throw f.invalidParameterError("animated","boolean",t.animated);if(f.defined(t.pages))if(f.integer(t.pages)&&f.inRange(t.pages,-1,1e5))i.pages=t.pages;else throw f.invalidParameterError("pages","integer between -1 and 100000",t.pages);if(f.defined(t.page))if(f.integer(t.page)&&f.inRange(t.page,0,1e5))i.page=t.page;else throw f.invalidParameterError("page","integer between 0 and 100000",t.page);if(f.defined(t.level))if(f.integer(t.level)&&f.inRange(t.level,0,256))i.level=t.level;else throw f.invalidParameterError("level","integer between 0 and 256",t.level);if(f.defined(t.subifd))if(f.integer(t.subifd)&&f.inRange(t.subifd,-1,1e5))i.subifd=t.subifd;else throw f.invalidParameterError("subifd","integer between -1 and 100000",t.subifd);if(f.defined(t.create))if(f.object(t.create)&&f.integer(t.create.width)&&t.create.width>0&&f.integer(t.create.height)&&t.create.height>0&&f.integer(t.create.channels)){if(i.createWidth=t.create.width,i.createHeight=t.create.height,i.createChannels=t.create.channels,f.defined(t.create.noise)){if(!f.object(t.create.noise))throw new Error("Expected noise to be an object");if(!f.inArray(t.create.noise.type,["gaussian"]))throw new Error("Only gaussian noise is supported at the moment");if(!f.inRange(t.create.channels,1,4))throw f.invalidParameterError("create.channels","number between 1 and 4",t.create.channels);if(i.createNoiseType=t.create.noise.type,f.number(t.create.noise.mean)&&f.inRange(t.create.noise.mean,0,1e4))i.createNoiseMean=t.create.noise.mean;else throw f.invalidParameterError("create.noise.mean","number between 0 and 10000",t.create.noise.mean);if(f.number(t.create.noise.sigma)&&f.inRange(t.create.noise.sigma,0,1e4))i.createNoiseSigma=t.create.noise.sigma;else throw f.invalidParameterError("create.noise.sigma","number between 0 and 10000",t.create.noise.sigma)}else if(f.defined(t.create.background)){if(!f.inRange(t.create.channels,3,4))throw f.invalidParameterError("create.channels","number between 3 and 4",t.create.channels);let n=zs(t.create.background);i.createBackground=[n.red(),n.green(),n.blue(),Math.round(n.alpha()*255)]}else throw new Error("Expected valid noise or background to create a new input image");delete i.buffer}else throw new Error("Expected valid width, height and channels to create a new input image");if(f.defined(t.text))if(f.object(t.text)&&f.string(t.text.text)){if(i.textValue=t.text.text,f.defined(t.text.height)&&f.defined(t.text.dpi))throw new Error("Expected only one of dpi or height");if(f.defined(t.text.font))if(f.string(t.text.font))i.textFont=t.text.font;else throw f.invalidParameterError("text.font","string",t.text.font);if(f.defined(t.text.fontfile))if(f.string(t.text.fontfile))i.textFontfile=t.text.fontfile;else throw f.invalidParameterError("text.fontfile","string",t.text.fontfile);if(f.defined(t.text.width))if(f.integer(t.text.width)&&t.text.width>0)i.textWidth=t.text.width;else throw f.invalidParameterError("text.width","positive integer",t.text.width);if(f.defined(t.text.height))if(f.integer(t.text.height)&&t.text.height>0)i.textHeight=t.text.height;else throw f.invalidParameterError("text.height","positive integer",t.text.height);if(f.defined(t.text.align))if(f.string(t.text.align)&&f.string(this.constructor.align[t.text.align]))i.textAlign=this.constructor.align[t.text.align];else throw f.invalidParameterError("text.align","valid alignment",t.text.align);if(f.defined(t.text.justify))if(f.bool(t.text.justify))i.textJustify=t.text.justify;else throw f.invalidParameterError("text.justify","boolean",t.text.justify);if(f.defined(t.text.dpi))if(f.integer(t.text.dpi)&&f.inRange(t.text.dpi,1,1e6))i.textDpi=t.text.dpi;else throw f.invalidParameterError("text.dpi","integer between 1 and 1000000",t.text.dpi);if(f.defined(t.text.rgba))if(f.bool(t.text.rgba))i.textRgba=t.text.rgba;else throw f.invalidParameterError("text.rgba","bool",t.text.rgba);if(f.defined(t.text.spacing))if(f.integer(t.text.spacing)&&f.inRange(t.text.spacing,-1e6,1e6))i.textSpacing=t.text.spacing;else throw f.invalidParameterError("text.spacing","integer between -1000000 and 1000000",t.text.spacing);if(f.defined(t.text.wrap))if(f.string(t.text.wrap)&&f.inArray(t.text.wrap,["word","char","word-char","none"]))i.textWrap=t.text.wrap;else throw f.invalidParameterError("text.wrap","one of: word, char, word-char, none",t.text.wrap);delete i.buffer}else throw new Error("Expected a valid string to create an image with text.")}else if(f.defined(t))throw new Error("Invalid input options "+t);return i}function Ws(e,t,r){Array.isArray(this.options.input.buffer)?f.buffer(e)?(this.options.input.buffer.length===0&&this.on("finish",()=>{this.streamInFinished=!0}),this.options.input.buffer.push(e),r()):r(new Error("Non-Buffer data on Writable Stream")):r(new Error("Unexpected data on Writable Stream"))}function Hs(){this._isStreamInput()&&(this.options.input.buffer=Buffer.concat(this.options.input.buffer))}function Vs(){return Array.isArray(this.options.input.buffer)}function Xs(e){let t=Error();return f.fn(e)?(this._isStreamInput()?this.on("finish",()=>{this._flattenBufferIn(),J.metadata(this.options,(r,i)=>{r?e(f.nativeError(r,t)):e(null,i)})}):J.metadata(this.options,(r,i)=>{r?e(f.nativeError(r,t)):e(null,i)}),this):this._isStreamInput()?new Promise((r,i)=>{let n=()=>{this._flattenBufferIn(),J.metadata(this.options,(s,o)=>{s?i(f.nativeError(s,t)):r(o)})};this.writableFinished?n():this.once("finish",n)}):new Promise((r,i)=>{J.metadata(this.options,(n,s)=>{n?i(f.nativeError(n,t)):r(s)})})}function Qs(e){let t=Error();return f.fn(e)?(this._isStreamInput()?this.on("finish",()=>{this._flattenBufferIn(),J.stats(this.options,(r,i)=>{r?e(f.nativeError(r,t)):e(null,i)})}):J.stats(this.options,(r,i)=>{r?e(f.nativeError(r,t)):e(null,i)}),this):this._isStreamInput()?new Promise((r,i)=>{this.on("finish",function(){this._flattenBufferIn(),J.stats(this.options,(n,s)=>{n?i(f.nativeError(n,t)):r(s)})})}):new Promise((r,i)=>{J.stats(this.options,(n,s)=>{n?i(f.nativeError(n,t)):r(s)})})}Si.exports=function(e){Object.assign(e.prototype,{_inputOptionsFromObject:Ai,_createInputDescriptor:Gs,_write:Ws,_flattenBufferIn:Hs,_isStreamInput:Vs,metadata:Xs,stats:Qs}),e.align=Us}});var Ti=v((gc,Bi)=>{"use strict";var g=_(),Fi={center:0,centre:0,north:1,east:2,south:3,west:4,northeast:5,southeast:6,southwest:7,northwest:8},Ni={top:1,right:2,bottom:3,left:4,"right top":5,"right bottom":6,"left bottom":7,"left top":8},Li={background:"background",copy:"copy",repeat:"repeat",mirror:"mirror"},Ci={entropy:16,attention:17},wt={nearest:"nearest",linear:"linear",cubic:"cubic",mitchell:"mitchell",lanczos2:"lanczos2",lanczos3:"lanczos3"},Js={contain:"contain",cover:"cover",fill:"fill",inside:"inside",outside:"outside"},Ks={contain:"embed",cover:"crop",fill:"ignore_aspect",inside:"max",outside:"min"};function yt(e){return e.angle%360!==0||e.useExifOrientation===!0||e.rotationAngle!==0}function He(e){return e.width!==-1||e.height!==-1}function Ys(e,t,r){if(He(this.options)&&this.options.debuglog("ignoring previous resize options"),this.options.widthPost!==-1&&this.options.debuglog("operation order will be: extract, resize, extract"),g.defined(e))if(g.object(e)&&!g.defined(r))r=e;else if(g.integer(e)&&e>0)this.options.width=e;else throw g.invalidParameterError("width","positive integer",e);else this.options.width=-1;if(g.defined(t))if(g.integer(t)&&t>0)this.options.height=t;else throw g.invalidParameterError("height","positive integer",t);else this.options.height=-1;if(g.object(r)){if(g.defined(r.width))if(g.integer(r.width)&&r.width>0)this.options.width=r.width;else throw g.invalidParameterError("width","positive integer",r.width);if(g.defined(r.height))if(g.integer(r.height)&&r.height>0)this.options.height=r.height;else throw g.invalidParameterError("height","positive integer",r.height);if(g.defined(r.fit)){let i=Ks[r.fit];if(g.string(i))this.options.canvas=i;else throw g.invalidParameterError("fit","valid fit",r.fit)}if(g.defined(r.position)){let i=g.integer(r.position)?r.position:Ci[r.position]||Ni[r.position]||Fi[r.position];if(g.integer(i)&&(g.inRange(i,0,8)||g.inRange(i,16,17)))this.options.position=i;else throw g.invalidParameterError("position","valid position/gravity/strategy",r.position)}if(this._setBackgroundColourOption("resizeBackground",r.background),g.defined(r.kernel))if(g.string(wt[r.kernel]))this.options.kernel=wt[r.kernel];else throw g.invalidParameterError("kernel","valid kernel name",r.kernel);g.defined(r.withoutEnlargement)&&this._setBooleanOption("withoutEnlargement",r.withoutEnlargement),g.defined(r.withoutReduction)&&this._setBooleanOption("withoutReduction",r.withoutReduction),g.defined(r.fastShrinkOnLoad)&&this._setBooleanOption("fastShrinkOnLoad",r.fastShrinkOnLoad)}return yt(this.options)&&He(this.options)&&(this.options.rotateBeforePreExtract=!0),this}function Zs(e){if(g.integer(e)&&e>0)this.options.extendTop=e,this.options.extendBottom=e,this.options.extendLeft=e,this.options.extendRight=e;else if(g.object(e)){if(g.defined(e.top))if(g.integer(e.top)&&e.top>=0)this.options.extendTop=e.top;else throw g.invalidParameterError("top","positive integer",e.top);if(g.defined(e.bottom))if(g.integer(e.bottom)&&e.bottom>=0)this.options.extendBottom=e.bottom;else throw g.invalidParameterError("bottom","positive integer",e.bottom);if(g.defined(e.left))if(g.integer(e.left)&&e.left>=0)this.options.extendLeft=e.left;else throw g.invalidParameterError("left","positive integer",e.left);if(g.defined(e.right))if(g.integer(e.right)&&e.right>=0)this.options.extendRight=e.right;else throw g.invalidParameterError("right","positive integer",e.right);if(this._setBackgroundColourOption("extendBackground",e.background),g.defined(e.extendWith))if(g.string(Li[e.extendWith]))this.options.extendWith=Li[e.extendWith];else throw g.invalidParameterError("extendWith","one of: background, copy, repeat, mirror",e.extendWith)}else throw g.invalidParameterError("extend","integer or object",e);return this}function eo(e){let t=He(this.options)||this.options.widthPre!==-1?"Post":"Pre";return this.options[`width${t}`]!==-1&&this.options.debuglog("ignoring previous extract options"),["left","top","width","height"].forEach(function(r){let i=e[r];if(g.integer(i)&&i>=0)this.options[r+(r==="left"||r==="top"?"Offset":"")+t]=i;else throw g.invalidParameterError(r,"integer",i)},this),yt(this.options)&&!He(this.options)&&(this.options.widthPre===-1||this.options.widthPost===-1)&&(this.options.rotateBeforePreExtract=!0),this}function to(e){if(this.options.trimThreshold=10,g.defined(e))if(g.object(e)){if(g.defined(e.background)&&this._setBackgroundColourOption("trimBackground",e.background),g.defined(e.threshold))if(g.number(e.threshold)&&e.threshold>=0)this.options.trimThreshold=e.threshold;else throw g.invalidParameterError("threshold","positive number",e.threshold);g.defined(e.lineArt)&&this._setBooleanOption("trimLineArt",e.lineArt)}else throw g.invalidParameterError("trim","object",e);return yt(this.options)&&(this.options.rotateBeforePreExtract=!0),this}Bi.exports=function(e){Object.assign(e.prototype,{resize:Ys,extend:Zs,extract:eo,trim:to}),e.gravity=Fi,e.strategy=Ci,e.kernel=wt,e.fit=Js,e.position=Ni}});var Oi=v((bc,Mi)=>{"use strict";var E=_(),Et={clear:"clear",source:"source",over:"over",in:"in",out:"out",atop:"atop",dest:"dest","dest-over":"dest-over","dest-in":"dest-in","dest-out":"dest-out","dest-atop":"dest-atop",xor:"xor",add:"add",saturate:"saturate",multiply:"multiply",screen:"screen",overlay:"overlay",darken:"darken",lighten:"lighten","colour-dodge":"colour-dodge","color-dodge":"colour-dodge","colour-burn":"colour-burn","color-burn":"colour-burn","hard-light":"hard-light","soft-light":"soft-light",difference:"difference",exclusion:"exclusion"};function ro(e){if(!Array.isArray(e))throw E.invalidParameterError("images to composite","array",e);return this.options.composite=e.map(t=>{if(!E.object(t))throw E.invalidParameterError("image to composite","object",t);let r=this._inputOptionsFromObject(t),i={input:this._createInputDescriptor(t.input,r,{allowStream:!1}),blend:"over",tile:!1,left:0,top:0,hasOffset:!1,gravity:0,premultiplied:!1};if(E.defined(t.blend))if(E.string(Et[t.blend]))i.blend=Et[t.blend];else throw E.invalidParameterError("blend","valid blend name",t.blend);if(E.defined(t.tile))if(E.bool(t.tile))i.tile=t.tile;else throw E.invalidParameterError("tile","boolean",t.tile);if(E.defined(t.left))if(E.integer(t.left))i.left=t.left;else throw E.invalidParameterError("left","integer",t.left);if(E.defined(t.top))if(E.integer(t.top))i.top=t.top;else throw E.invalidParameterError("top","integer",t.top);if(E.defined(t.top)!==E.defined(t.left))throw new Error("Expected both left and top to be set");if(i.hasOffset=E.integer(t.top)&&E.integer(t.left),E.defined(t.gravity))if(E.integer(t.gravity)&&E.inRange(t.gravity,0,8))i.gravity=t.gravity;else if(E.string(t.gravity)&&E.integer(this.constructor.gravity[t.gravity]))i.gravity=this.constructor.gravity[t.gravity];else throw E.invalidParameterError("gravity","valid gravity",t.gravity);if(E.defined(t.premultiplied))if(E.bool(t.premultiplied))i.premultiplied=t.premultiplied;else throw E.invalidParameterError("premultiplied","boolean",t.premultiplied);return i}),this}Mi.exports=function(e){e.prototype.composite=ro,e.blend=Et}});var Di=v((vc,_i)=>{"use strict";var io=We(),c=_(),qi={integer:"integer",float:"float",approximate:"approximate"};function no(e,t){if((this.options.useExifOrientation||this.options.angle||this.options.rotationAngle)&&this.options.debuglog("ignoring previous rotate options"),!c.defined(e))this.options.useExifOrientation=!0;else if(c.integer(e)&&!(e%90))this.options.angle=e;else if(c.number(e)){if(this.options.rotationAngle=e,c.object(t)&&t.background){let r=io(t.background);this.options.rotationBackground=[r.red(),r.green(),r.blue(),Math.round(r.alpha()*255)]}}else throw c.invalidParameterError("angle","numeric",e);return this}function ao(e){return this.options.flip=c.bool(e)?e:!0,this}function so(e){return this.options.flop=c.bool(e)?e:!0,this}function oo(e,t){let r=[].concat(...e);if(r.length===4&&r.every(c.number))this.options.affineMatrix=r;else throw c.invalidParameterError("matrix","1x4 or 2x2 array",e);if(c.defined(t))if(c.object(t)){if(this._setBackgroundColourOption("affineBackground",t.background),c.defined(t.idx))if(c.number(t.idx))this.options.affineIdx=t.idx;else throw c.invalidParameterError("options.idx","number",t.idx);if(c.defined(t.idy))if(c.number(t.idy))this.options.affineIdy=t.idy;else throw c.invalidParameterError("options.idy","number",t.idy);if(c.defined(t.odx))if(c.number(t.odx))this.options.affineOdx=t.odx;else throw c.invalidParameterError("options.odx","number",t.odx);if(c.defined(t.ody))if(c.number(t.ody))this.options.affineOdy=t.ody;else throw c.invalidParameterError("options.ody","number",t.ody);if(c.defined(t.interpolator))if(c.inArray(t.interpolator,Object.values(this.constructor.interpolators)))this.options.affineInterpolator=t.interpolator;else throw c.invalidParameterError("options.interpolator","valid interpolator name",t.interpolator)}else throw c.invalidParameterError("options","object",t);return this}function lo(e,t,r){if(!c.defined(e))this.options.sharpenSigma=-1;else if(c.bool(e))this.options.sharpenSigma=e?-1:0;else if(c.number(e)&&c.inRange(e,.01,1e4)){if(this.options.sharpenSigma=e,c.defined(t))if(c.number(t)&&c.inRange(t,0,1e4))this.options.sharpenM1=t;else throw c.invalidParameterError("flat","number between 0 and 10000",t);if(c.defined(r))if(c.number(r)&&c.inRange(r,0,1e4))this.options.sharpenM2=r;else throw c.invalidParameterError("jagged","number between 0 and 10000",r)}else if(c.plainObject(e)){if(c.number(e.sigma)&&c.inRange(e.sigma,1e-6,10))this.options.sharpenSigma=e.sigma;else throw c.invalidParameterError("options.sigma","number between 0.000001 and 10",e.sigma);if(c.defined(e.m1))if(c.number(e.m1)&&c.inRange(e.m1,0,1e6))this.options.sharpenM1=e.m1;else throw c.invalidParameterError("options.m1","number between 0 and 1000000",e.m1);if(c.defined(e.m2))if(c.number(e.m2)&&c.inRange(e.m2,0,1e6))this.options.sharpenM2=e.m2;else throw c.invalidParameterError("options.m2","number between 0 and 1000000",e.m2);if(c.defined(e.x1))if(c.number(e.x1)&&c.inRange(e.x1,0,1e6))this.options.sharpenX1=e.x1;else throw c.invalidParameterError("options.x1","number between 0 and 1000000",e.x1);if(c.defined(e.y2))if(c.number(e.y2)&&c.inRange(e.y2,0,1e6))this.options.sharpenY2=e.y2;else throw c.invalidParameterError("options.y2","number between 0 and 1000000",e.y2);if(c.defined(e.y3))if(c.number(e.y3)&&c.inRange(e.y3,0,1e6))this.options.sharpenY3=e.y3;else throw c.invalidParameterError("options.y3","number between 0 and 1000000",e.y3)}else throw c.invalidParameterError("sigma","number between 0.01 and 10000",e);return this}function co(e){if(!c.defined(e))this.options.medianSize=3;else if(c.integer(e)&&c.inRange(e,1,1e3))this.options.medianSize=e;else throw c.invalidParameterError("size","integer between 1 and 1000",e);return this}function fo(e){let t;if(c.number(e))t=e;else if(c.plainObject(e)){if(!c.number(e.sigma))throw c.invalidParameterError("options.sigma","number between 0.3 and 1000",t);if(t=e.sigma,"precision"in e)if(c.string(qi[e.precision]))this.options.precision=qi[e.precision];else throw c.invalidParameterError("precision","one of: integer, float, approximate",e.precision);if("minAmplitude"in e)if(c.number(e.minAmplitude)&&c.inRange(e.minAmplitude,.001,1))this.options.minAmpl=e.minAmplitude;else throw c.invalidParameterError("minAmplitude","number between 0.001 and 1",e.minAmplitude)}if(!c.defined(e))this.options.blurSigma=-1;else if(c.bool(e))this.options.blurSigma=e?-1:0;else if(c.number(t)&&c.inRange(t,.3,1e3))this.options.blurSigma=t;else throw c.invalidParameterError("sigma","number between 0.3 and 1000",t);return this}function ho(e){return this.options.flatten=c.bool(e)?e:!0,c.object(e)&&this._setBackgroundColourOption("flattenBackground",e.background),this}function uo(){return this.options.unflatten=!0,this}function mo(e,t){if(!c.defined(e))this.options.gamma=2.2;else if(c.number(e)&&c.inRange(e,1,3))this.options.gamma=e;else throw c.invalidParameterError("gamma","number between 1.0 and 3.0",e);if(!c.defined(t))this.options.gammaOut=this.options.gamma;else if(c.number(t)&&c.inRange(t,1,3))this.options.gammaOut=t;else throw c.invalidParameterError("gammaOut","number between 1.0 and 3.0",t);return this}function po(e){if(this.options.negate=c.bool(e)?e:!0,c.plainObject(e)&&"alpha"in e)if(c.bool(e.alpha))this.options.negateAlpha=e.alpha;else throw c.invalidParameterError("alpha","should be boolean value",e.alpha);return this}function go(e){if(c.plainObject(e)){if(c.defined(e.lower))if(c.number(e.lower)&&c.inRange(e.lower,0,99))this.options.normaliseLower=e.lower;else throw c.invalidParameterError("lower","number between 0 and 99",e.lower);if(c.defined(e.upper))if(c.number(e.upper)&&c.inRange(e.upper,1,100))this.options.normaliseUpper=e.upper;else throw c.invalidParameterError("upper","number between 1 and 100",e.upper)}if(this.options.normaliseLower>=this.options.normaliseUpper)throw c.invalidParameterError("range","lower to be less than upper",`${this.options.normaliseLower} >= ${this.options.normaliseUpper}`);return this.options.normalise=!0,this}function bo(e){return this.normalise(e)}function vo(e){if(c.plainObject(e)){if(c.integer(e.width)&&e.width>0)this.options.claheWidth=e.width;else throw c.invalidParameterError("width","integer greater than zero",e.width);if(c.integer(e.height)&&e.height>0)this.options.claheHeight=e.height;else throw c.invalidParameterError("height","integer greater than zero",e.height);if(c.defined(e.maxSlope))if(c.integer(e.maxSlope)&&c.inRange(e.maxSlope,0,100))this.options.claheMaxSlope=e.maxSlope;else throw c.invalidParameterError("maxSlope","integer between 0 and 100",e.maxSlope)}else throw c.invalidParameterError("options","plain object",e);return this}function wo(e){if(!c.object(e)||!Array.isArray(e.kernel)||!c.integer(e.width)||!c.integer(e.height)||!c.inRange(e.width,3,1001)||!c.inRange(e.height,3,1001)||e.height*e.width!==e.kernel.length)throw new Error("Invalid convolution kernel");return c.integer(e.scale)||(e.scale=e.kernel.reduce(function(t,r){return t+r},0)),e.scale<1&&(e.scale=1),c.integer(e.offset)||(e.offset=0),this.options.convKernel=e,this}function yo(e,t){if(!c.defined(e))this.options.threshold=128;else if(c.bool(e))this.options.threshold=e?128:0;else if(c.integer(e)&&c.inRange(e,0,255))this.options.threshold=e;else throw c.invalidParameterError("threshold","integer between 0 and 255",e);return!c.object(t)||t.greyscale===!0||t.grayscale===!0?this.options.thresholdGrayscale=!0:this.options.thresholdGrayscale=!1,this}function Eo(e,t,r){if(this.options.boolean=this._createInputDescriptor(e,r),c.string(t)&&c.inArray(t,["and","or","eor"]))this.options.booleanOp=t;else throw c.invalidParameterError("operator","one of: and, or, eor",t);return this}function xo(e,t){if(!c.defined(e)&&c.number(t)?e=1:c.number(e)&&!c.defined(t)&&(t=0),!c.defined(e))this.options.linearA=[];else if(c.number(e))this.options.linearA=[e];else if(Array.isArray(e)&&e.length&&e.every(c.number))this.options.linearA=e;else throw c.invalidParameterError("a","number or array of numbers",e);if(!c.defined(t))this.options.linearB=[];else if(c.number(t))this.options.linearB=[t];else if(Array.isArray(t)&&t.length&&t.every(c.number))this.options.linearB=t;else throw c.invalidParameterError("b","number or array of numbers",t);if(this.options.linearA.length!==this.options.linearB.length)throw new Error("Expected a and b to be arrays of the same length");return this}function Po(e){if(!Array.isArray(e))throw c.invalidParameterError("inputMatrix","array",e);if(e.length!==3&&e.length!==4)throw c.invalidParameterError("inputMatrix","3x3 or 4x4 array",e.length);let t=e.flat().map(Number);if(t.length!==9&&t.length!==16)throw c.invalidParameterError("inputMatrix","cardinality of 9 or 16",t.length);return this.options.recombMatrix=t,this}function Io(e){if(!c.plainObject(e))throw c.invalidParameterError("options","plain object",e);if("brightness"in e)if(c.number(e.brightness)&&e.brightness>=0)this.options.brightness=e.brightness;else throw c.invalidParameterError("brightness","number above zero",e.brightness);if("saturation"in e)if(c.number(e.saturation)&&e.saturation>=0)this.options.saturation=e.saturation;else throw c.invalidParameterError("saturation","number above zero",e.saturation);if("hue"in e)if(c.integer(e.hue))this.options.hue=e.hue%360;else throw c.invalidParameterError("hue","number",e.hue);if("lightness"in e)if(c.number(e.lightness))this.options.lightness=e.lightness;else throw c.invalidParameterError("lightness","number",e.lightness);return this}_i.exports=function(e){Object.assign(e.prototype,{rotate:no,flip:ao,flop:so,affine:oo,sharpen:lo,median:co,blur:fo,flatten:ho,unflatten:uo,gamma:mo,negate:po,normalise:go,normalize:bo,clahe:vo,convolve:wo,threshold:yo,boolean:Eo,linear:xo,recomb:Po,modulate:Io})}});var Gi=v((wc,Ui)=>{"use strict";var ko=We(),W=_(),zi={multiband:"multiband","b-w":"b-w",bw:"b-w",cmyk:"cmyk",srgb:"srgb"};function Ro(e){return this._setBackgroundColourOption("tint",e),this}function jo(e){return this.options.greyscale=W.bool(e)?e:!0,this}function Ao(e){return this.greyscale(e)}function So(e){if(!W.string(e))throw W.invalidParameterError("colourspace","string",e);return this.options.colourspacePipeline=e,this}function $o(e){return this.pipelineColourspace(e)}function Lo(e){if(!W.string(e))throw W.invalidParameterError("colourspace","string",e);return this.options.colourspace=e,this}function Fo(e){return this.toColourspace(e)}function No(e,t){if(W.defined(t))if(W.object(t)||W.string(t)){let r=ko(t);this.options[e]=[r.red(),r.green(),r.blue(),Math.round(r.alpha()*255)]}else throw W.invalidParameterError("background","object or string",t)}Ui.exports=function(e){Object.assign(e.prototype,{tint:Ro,greyscale:jo,grayscale:Ao,pipelineColourspace:So,pipelineColorspace:$o,toColourspace:Lo,toColorspace:Fo,_setBackgroundColourOption:No}),e.colourspace=zi,e.colorspace=zi}});var Hi=v((yc,Wi)=>{"use strict";var G=_(),Co={and:"and",or:"or",eor:"eor"};function Bo(){return this.options.removeAlpha=!0,this}function To(e){if(G.defined(e))if(G.number(e)&&G.inRange(e,0,1))this.options.ensureAlpha=e;else throw G.invalidParameterError("alpha","number between 0 and 1",e);else this.options.ensureAlpha=1;return this}function Mo(e){let t={red:0,green:1,blue:2,alpha:3};if(Object.keys(t).includes(e)&&(e=t[e]),G.integer(e)&&G.inRange(e,0,4))this.options.extractChannel=e;else throw G.invalidParameterError("channel","integer or one of: red, green, blue, alpha",e);return this}function Oo(e,t){return Array.isArray(e)?e.forEach(function(r){this.options.joinChannelIn.push(this._createInputDescriptor(r,t))},this):this.options.joinChannelIn.push(this._createInputDescriptor(e,t)),this}function qo(e){if(G.string(e)&&G.inArray(e,["and","or","eor"]))this.options.bandBoolOp=e;else throw G.invalidParameterError("boolOp","one of: and, or, eor",e);return this}Wi.exports=function(e){Object.assign(e.prototype,{removeAlpha:Bo,ensureAlpha:To,extractChannel:Mo,joinChannel:Oo,bandbool:qo}),e.bool=Co}});var Yi=v((Ec,Ki)=>{"use strict";var xt=require("node:path"),a=_(),de=be(),Vi=new Map([["heic","heif"],["heif","heif"],["avif","avif"],["jpeg","jpeg"],["jpg","jpeg"],["jpe","jpeg"],["tile","tile"],["dz","tile"],["png","png"],["raw","raw"],["tiff","tiff"],["tif","tiff"],["webp","webp"],["gif","gif"],["jp2","jp2"],["jpx","jp2"],["j2k","jp2"],["j2c","jp2"],["jxl","jxl"]]),_o=/\.(jp[2x]|j2[kc])$/i,Xi=()=>new Error("JP2 output requires libvips with support for OpenJPEG"),Qi=e=>1<<31-Math.clz32(Math.ceil(Math.log2(e)));function Do(e,t){let r;if(a.string(e)?a.string(this.options.input.file)&&xt.resolve(this.options.input.file)===xt.resolve(e)?r=new Error("Cannot use same file for input and output"):_o.test(xt.extname(e))&&!this.constructor.format.jp2k.output.file&&(r=Xi()):r=new Error("Missing output file path"),r)if(a.fn(t))t(r);else return Promise.reject(r);else{this.options.fileOut=e;let i=Error();return this._pipeline(t,i)}return this}function zo(e,t){a.object(e)?this._setBooleanOption("resolveWithObject",e.resolveWithObject):this.options.resolveWithObject&&(this.options.resolveWithObject=!1),this.options.fileOut="";let r=Error();return this._pipeline(a.fn(e)?e:t,r)}function Uo(){return this.options.keepMetadata|=1,this}function Go(e){if(a.object(e))for(let[t,r]of Object.entries(e))if(a.object(r))for(let[i,n]of Object.entries(r))if(a.string(n))this.options.withExif[`exif-${t.toLowerCase()}-${i}`]=n;else throw a.invalidParameterError(`${t}.${i}`,"string",n);else throw a.invalidParameterError(t,"object",r);else throw a.invalidParameterError("exif","object",e);return this.options.withExifMerge=!1,this.keepExif()}function Wo(e){return this.withExif(e),this.options.withExifMerge=!0,this}function Ho(){return this.options.keepMetadata|=8,this}function Vo(e,t){if(a.string(e))this.options.withIccProfile=e;else throw a.invalidParameterError("icc","string",e);if(this.keepIccProfile(),a.object(t)&&a.defined(t.attach))if(a.bool(t.attach))t.attach||(this.options.keepMetadata&=-9);else throw a.invalidParameterError("attach","boolean",t.attach);return this}function Xo(){return this.options.keepMetadata=31,this}function Qo(e){if(this.keepMetadata(),this.withIccProfile("srgb"),a.object(e)){if(a.defined(e.orientation))if(a.integer(e.orientation)&&a.inRange(e.orientation,1,8))this.options.withMetadataOrientation=e.orientation;else throw a.invalidParameterError("orientation","integer between 1 and 8",e.orientation);if(a.defined(e.density))if(a.number(e.density)&&e.density>0)this.options.withMetadataDensity=e.density;else throw a.invalidParameterError("density","positive number",e.density);a.defined(e.icc)&&this.withIccProfile(e.icc),a.defined(e.exif)&&this.withExifMerge(e.exif)}return this}function Jo(e,t){let r=Vi.get((a.object(e)&&a.string(e.id)?e.id:e).toLowerCase());if(!r)throw a.invalidParameterError("format",`one of: ${[...Vi.keys()].join(", ")}`,e);return this[r](t)}function Ko(e){if(a.object(e)){if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,1,100))this.options.jpegQuality=e.quality;else throw a.invalidParameterError("quality","integer between 1 and 100",e.quality);if(a.defined(e.progressive)&&this._setBooleanOption("jpegProgressive",e.progressive),a.defined(e.chromaSubsampling))if(a.string(e.chromaSubsampling)&&a.inArray(e.chromaSubsampling,["4:2:0","4:4:4"]))this.options.jpegChromaSubsampling=e.chromaSubsampling;else throw a.invalidParameterError("chromaSubsampling","one of: 4:2:0, 4:4:4",e.chromaSubsampling);let t=a.bool(e.optimizeCoding)?e.optimizeCoding:e.optimiseCoding;if(a.defined(t)&&this._setBooleanOption("jpegOptimiseCoding",t),a.defined(e.mozjpeg))if(a.bool(e.mozjpeg))e.mozjpeg&&(this.options.jpegTrellisQuantisation=!0,this.options.jpegOvershootDeringing=!0,this.options.jpegOptimiseScans=!0,this.options.jpegProgressive=!0,this.options.jpegQuantisationTable=3);else throw a.invalidParameterError("mozjpeg","boolean",e.mozjpeg);let r=a.bool(e.trellisQuantization)?e.trellisQuantization:e.trellisQuantisation;a.defined(r)&&this._setBooleanOption("jpegTrellisQuantisation",r),a.defined(e.overshootDeringing)&&this._setBooleanOption("jpegOvershootDeringing",e.overshootDeringing);let i=a.bool(e.optimizeScans)?e.optimizeScans:e.optimiseScans;a.defined(i)&&(this._setBooleanOption("jpegOptimiseScans",i),i&&(this.options.jpegProgressive=!0));let n=a.number(e.quantizationTable)?e.quantizationTable:e.quantisationTable;if(a.defined(n))if(a.integer(n)&&a.inRange(n,0,8))this.options.jpegQuantisationTable=n;else throw a.invalidParameterError("quantisationTable","integer between 0 and 8",n)}return this._updateFormatOut("jpeg",e)}function Yo(e){if(a.object(e)){if(a.defined(e.progressive)&&this._setBooleanOption("pngProgressive",e.progressive),a.defined(e.compressionLevel))if(a.integer(e.compressionLevel)&&a.inRange(e.compressionLevel,0,9))this.options.pngCompressionLevel=e.compressionLevel;else throw a.invalidParameterError("compressionLevel","integer between 0 and 9",e.compressionLevel);a.defined(e.adaptiveFiltering)&&this._setBooleanOption("pngAdaptiveFiltering",e.adaptiveFiltering);let t=e.colours||e.colors;if(a.defined(t))if(a.integer(t)&&a.inRange(t,2,256))this.options.pngBitdepth=Qi(t);else throw a.invalidParameterError("colours","integer between 2 and 256",t);if(a.defined(e.palette)?this._setBooleanOption("pngPalette",e.palette):[e.quality,e.effort,e.colours,e.colors,e.dither].some(a.defined)&&this._setBooleanOption("pngPalette",!0),this.options.pngPalette){if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,0,100))this.options.pngQuality=e.quality;else throw a.invalidParameterError("quality","integer between 0 and 100",e.quality);if(a.defined(e.effort))if(a.integer(e.effort)&&a.inRange(e.effort,1,10))this.options.pngEffort=e.effort;else throw a.invalidParameterError("effort","integer between 1 and 10",e.effort);if(a.defined(e.dither))if(a.number(e.dither)&&a.inRange(e.dither,0,1))this.options.pngDither=e.dither;else throw a.invalidParameterError("dither","number between 0.0 and 1.0",e.dither)}}return this._updateFormatOut("png",e)}function Zo(e){if(a.object(e)){if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,1,100))this.options.webpQuality=e.quality;else throw a.invalidParameterError("quality","integer between 1 and 100",e.quality);if(a.defined(e.alphaQuality))if(a.integer(e.alphaQuality)&&a.inRange(e.alphaQuality,0,100))this.options.webpAlphaQuality=e.alphaQuality;else throw a.invalidParameterError("alphaQuality","integer between 0 and 100",e.alphaQuality);if(a.defined(e.lossless)&&this._setBooleanOption("webpLossless",e.lossless),a.defined(e.nearLossless)&&this._setBooleanOption("webpNearLossless",e.nearLossless),a.defined(e.smartSubsample)&&this._setBooleanOption("webpSmartSubsample",e.smartSubsample),a.defined(e.preset))if(a.string(e.preset)&&a.inArray(e.preset,["default","photo","picture","drawing","icon","text"]))this.options.webpPreset=e.preset;else throw a.invalidParameterError("preset","one of: default, photo, picture, drawing, icon, text",e.preset);if(a.defined(e.effort))if(a.integer(e.effort)&&a.inRange(e.effort,0,6))this.options.webpEffort=e.effort;else throw a.invalidParameterError("effort","integer between 0 and 6",e.effort);a.defined(e.minSize)&&this._setBooleanOption("webpMinSize",e.minSize),a.defined(e.mixed)&&this._setBooleanOption("webpMixed",e.mixed)}return Ji(e,this.options),this._updateFormatOut("webp",e)}function el(e){if(a.object(e)){a.defined(e.reuse)&&this._setBooleanOption("gifReuse",e.reuse),a.defined(e.progressive)&&this._setBooleanOption("gifProgressive",e.progressive);let t=e.colours||e.colors;if(a.defined(t))if(a.integer(t)&&a.inRange(t,2,256))this.options.gifBitdepth=Qi(t);else throw a.invalidParameterError("colours","integer between 2 and 256",t);if(a.defined(e.effort))if(a.number(e.effort)&&a.inRange(e.effort,1,10))this.options.gifEffort=e.effort;else throw a.invalidParameterError("effort","integer between 1 and 10",e.effort);if(a.defined(e.dither))if(a.number(e.dither)&&a.inRange(e.dither,0,1))this.options.gifDither=e.dither;else throw a.invalidParameterError("dither","number between 0.0 and 1.0",e.dither);if(a.defined(e.interFrameMaxError))if(a.number(e.interFrameMaxError)&&a.inRange(e.interFrameMaxError,0,32))this.options.gifInterFrameMaxError=e.interFrameMaxError;else throw a.invalidParameterError("interFrameMaxError","number between 0.0 and 32.0",e.interFrameMaxError);if(a.defined(e.interPaletteMaxError))if(a.number(e.interPaletteMaxError)&&a.inRange(e.interPaletteMaxError,0,256))this.options.gifInterPaletteMaxError=e.interPaletteMaxError;else throw a.invalidParameterError("interPaletteMaxError","number between 0.0 and 256.0",e.interPaletteMaxError)}return Ji(e,this.options),this._updateFormatOut("gif",e)}function tl(e){if(!this.constructor.format.jp2k.output.buffer)throw Xi();if(a.object(e)){if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,1,100))this.options.jp2Quality=e.quality;else throw a.invalidParameterError("quality","integer between 1 and 100",e.quality);if(a.defined(e.lossless))if(a.bool(e.lossless))this.options.jp2Lossless=e.lossless;else throw a.invalidParameterError("lossless","boolean",e.lossless);if(a.defined(e.tileWidth))if(a.integer(e.tileWidth)&&a.inRange(e.tileWidth,1,32768))this.options.jp2TileWidth=e.tileWidth;else throw a.invalidParameterError("tileWidth","integer between 1 and 32768",e.tileWidth);if(a.defined(e.tileHeight))if(a.integer(e.tileHeight)&&a.inRange(e.tileHeight,1,32768))this.options.jp2TileHeight=e.tileHeight;else throw a.invalidParameterError("tileHeight","integer between 1 and 32768",e.tileHeight);if(a.defined(e.chromaSubsampling))if(a.string(e.chromaSubsampling)&&a.inArray(e.chromaSubsampling,["4:2:0","4:4:4"]))this.options.jp2ChromaSubsampling=e.chromaSubsampling;else throw a.invalidParameterError("chromaSubsampling","one of: 4:2:0, 4:4:4",e.chromaSubsampling)}return this._updateFormatOut("jp2",e)}function Ji(e,t){if(a.object(e)&&a.defined(e.loop))if(a.integer(e.loop)&&a.inRange(e.loop,0,65535))t.loop=e.loop;else throw a.invalidParameterError("loop","integer between 0 and 65535",e.loop);if(a.object(e)&&a.defined(e.delay))if(a.integer(e.delay)&&a.inRange(e.delay,0,65535))t.delay=[e.delay];else if(Array.isArray(e.delay)&&e.delay.every(a.integer)&&e.delay.every(r=>a.inRange(r,0,65535)))t.delay=e.delay;else throw a.invalidParameterError("delay","integer or an array of integers between 0 and 65535",e.delay)}function rl(e){if(a.object(e)){if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,1,100))this.options.tiffQuality=e.quality;else throw a.invalidParameterError("quality","integer between 1 and 100",e.quality);if(a.defined(e.bitdepth))if(a.integer(e.bitdepth)&&a.inArray(e.bitdepth,[1,2,4,8]))this.options.tiffBitdepth=e.bitdepth;else throw a.invalidParameterError("bitdepth","1, 2, 4 or 8",e.bitdepth);if(a.defined(e.tile)&&this._setBooleanOption("tiffTile",e.tile),a.defined(e.tileWidth))if(a.integer(e.tileWidth)&&e.tileWidth>0)this.options.tiffTileWidth=e.tileWidth;else throw a.invalidParameterError("tileWidth","integer greater than zero",e.tileWidth);if(a.defined(e.tileHeight))if(a.integer(e.tileHeight)&&e.tileHeight>0)this.options.tiffTileHeight=e.tileHeight;else throw a.invalidParameterError("tileHeight","integer greater than zero",e.tileHeight);if(a.defined(e.miniswhite)&&this._setBooleanOption("tiffMiniswhite",e.miniswhite),a.defined(e.pyramid)&&this._setBooleanOption("tiffPyramid",e.pyramid),a.defined(e.xres))if(a.number(e.xres)&&e.xres>0)this.options.tiffXres=e.xres;else throw a.invalidParameterError("xres","number greater than zero",e.xres);if(a.defined(e.yres))if(a.number(e.yres)&&e.yres>0)this.options.tiffYres=e.yres;else throw a.invalidParameterError("yres","number greater than zero",e.yres);if(a.defined(e.compression))if(a.string(e.compression)&&a.inArray(e.compression,["none","jpeg","deflate","packbits","ccittfax4","lzw","webp","zstd","jp2k"]))this.options.tiffCompression=e.compression;else throw a.invalidParameterError("compression","one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k",e.compression);if(a.defined(e.predictor))if(a.string(e.predictor)&&a.inArray(e.predictor,["none","horizontal","float"]))this.options.tiffPredictor=e.predictor;else throw a.invalidParameterError("predictor","one of: none, horizontal, float",e.predictor);if(a.defined(e.resolutionUnit))if(a.string(e.resolutionUnit)&&a.inArray(e.resolutionUnit,["inch","cm"]))this.options.tiffResolutionUnit=e.resolutionUnit;else throw a.invalidParameterError("resolutionUnit","one of: inch, cm",e.resolutionUnit)}return this._updateFormatOut("tiff",e)}function il(e){return this.heif({...e,compression:"av1"})}function nl(e){if(a.object(e)){if(a.string(e.compression)&&a.inArray(e.compression,["av1","hevc"]))this.options.heifCompression=e.compression;else throw a.invalidParameterError("compression","one of: av1, hevc",e.compression);if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,1,100))this.options.heifQuality=e.quality;else throw a.invalidParameterError("quality","integer between 1 and 100",e.quality);if(a.defined(e.lossless))if(a.bool(e.lossless))this.options.heifLossless=e.lossless;else throw a.invalidParameterError("lossless","boolean",e.lossless);if(a.defined(e.effort))if(a.integer(e.effort)&&a.inRange(e.effort,0,9))this.options.heifEffort=e.effort;else throw a.invalidParameterError("effort","integer between 0 and 9",e.effort);if(a.defined(e.chromaSubsampling))if(a.string(e.chromaSubsampling)&&a.inArray(e.chromaSubsampling,["4:2:0","4:4:4"]))this.options.heifChromaSubsampling=e.chromaSubsampling;else throw a.invalidParameterError("chromaSubsampling","one of: 4:2:0, 4:4:4",e.chromaSubsampling);if(a.defined(e.bitdepth))if(a.integer(e.bitdepth)&&a.inArray(e.bitdepth,[8,10,12])){if(e.bitdepth!==8&&this.constructor.versions.heif)throw a.invalidParameterError("bitdepth when using prebuilt binaries",8,e.bitdepth);this.options.heifBitdepth=e.bitdepth}else throw a.invalidParameterError("bitdepth","8, 10 or 12",e.bitdepth)}else throw a.invalidParameterError("options","Object",e);return this._updateFormatOut("heif",e)}function al(e){if(a.object(e)){if(a.defined(e.quality))if(a.integer(e.quality)&&a.inRange(e.quality,1,100))this.options.jxlDistance=e.quality>=30?.1+(100-e.quality)*.09:53/3e3*e.quality*e.quality-23/20*e.quality+25;else throw a.invalidParameterError("quality","integer between 1 and 100",e.quality);else if(a.defined(e.distance))if(a.number(e.distance)&&a.inRange(e.distance,0,15))this.options.jxlDistance=e.distance;else throw a.invalidParameterError("distance","number between 0.0 and 15.0",e.distance);if(a.defined(e.decodingTier))if(a.integer(e.decodingTier)&&a.inRange(e.decodingTier,0,4))this.options.jxlDecodingTier=e.decodingTier;else throw a.invalidParameterError("decodingTier","integer between 0 and 4",e.decodingTier);if(a.defined(e.lossless))if(a.bool(e.lossless))this.options.jxlLossless=e.lossless;else throw a.invalidParameterError("lossless","boolean",e.lossless);if(a.defined(e.effort))if(a.integer(e.effort)&&a.inRange(e.effort,3,9))this.options.jxlEffort=e.effort;else throw a.invalidParameterError("effort","integer between 3 and 9",e.effort)}return this._updateFormatOut("jxl",e)}function sl(e){if(a.object(e)&&a.defined(e.depth))if(a.string(e.depth)&&a.inArray(e.depth,["char","uchar","short","ushort","int","uint","float","complex","double","dpcomplex"]))this.options.rawDepth=e.depth;else throw a.invalidParameterError("depth","one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex",e.depth);return this._updateFormatOut("raw")}function ol(e){if(a.object(e)){if(a.defined(e.size))if(a.integer(e.size)&&a.inRange(e.size,1,8192))this.options.tileSize=e.size;else throw a.invalidParameterError("size","integer between 1 and 8192",e.size);if(a.defined(e.overlap))if(a.integer(e.overlap)&&a.inRange(e.overlap,0,8192)){if(e.overlap>this.options.tileSize)throw a.invalidParameterError("overlap",`<= size (${this.options.tileSize})`,e.overlap);this.options.tileOverlap=e.overlap}else throw a.invalidParameterError("overlap","integer between 0 and 8192",e.overlap);if(a.defined(e.container))if(a.string(e.container)&&a.inArray(e.container,["fs","zip"]))this.options.tileContainer=e.container;else throw a.invalidParameterError("container","one of: fs, zip",e.container);if(a.defined(e.layout))if(a.string(e.layout)&&a.inArray(e.layout,["dz","google","iiif","iiif3","zoomify"]))this.options.tileLayout=e.layout;else throw a.invalidParameterError("layout","one of: dz, google, iiif, iiif3, zoomify",e.layout);if(a.defined(e.angle))if(a.integer(e.angle)&&!(e.angle%90))this.options.tileAngle=e.angle;else throw a.invalidParameterError("angle","positive/negative multiple of 90",e.angle);if(this._setBackgroundColourOption("tileBackground",e.background),a.defined(e.depth))if(a.string(e.depth)&&a.inArray(e.depth,["onepixel","onetile","one"]))this.options.tileDepth=e.depth;else throw a.invalidParameterError("depth","one of: onepixel, onetile, one",e.depth);if(a.defined(e.skipBlanks))if(a.integer(e.skipBlanks)&&a.inRange(e.skipBlanks,-1,65535))this.options.tileSkipBlanks=e.skipBlanks;else throw a.invalidParameterError("skipBlanks","integer between -1 and 255/65535",e.skipBlanks);else a.defined(e.layout)&&e.layout==="google"&&(this.options.tileSkipBlanks=5);let t=a.bool(e.center)?e.center:e.centre;if(a.defined(t)&&this._setBooleanOption("tileCentre",t),a.defined(e.id))if(a.string(e.id))this.options.tileId=e.id;else throw a.invalidParameterError("id","string",e.id);if(a.defined(e.basename))if(a.string(e.basename))this.options.tileBasename=e.basename;else throw a.invalidParameterError("basename","string",e.basename)}if(a.inArray(this.options.formatOut,["jpeg","png","webp"]))this.options.tileFormat=this.options.formatOut;else if(this.options.formatOut!=="input")throw a.invalidParameterError("format","one of: jpeg, png, webp",this.options.formatOut);return this._updateFormatOut("dz")}function ll(e){if(!a.plainObject(e))throw a.invalidParameterError("options","object",e);if(a.integer(e.seconds)&&a.inRange(e.seconds,0,3600))this.options.timeoutSeconds=e.seconds;else throw a.invalidParameterError("seconds","integer between 0 and 3600",e.seconds);return this}function cl(e,t){return a.object(t)&&t.force===!1||(this.options.formatOut=e),this}function dl(e,t){if(a.bool(t))this.options[e]=t;else throw a.invalidParameterError(e,"boolean",t)}function fl(){if(!this.options.streamOut){this.options.streamOut=!0;let e=Error();this._pipeline(void 0,e)}}function hl(e,t){return typeof e=="function"?(this._isStreamInput()?this.on("finish",()=>{this._flattenBufferIn(),de.pipeline(this.options,(r,i,n)=>{r?e(a.nativeError(r,t)):e(null,i,n)})}):de.pipeline(this.options,(r,i,n)=>{r?e(a.nativeError(r,t)):e(null,i,n)}),this):this.options.streamOut?(this._isStreamInput()?(this.once("finish",()=>{this._flattenBufferIn(),de.pipeline(this.options,(r,i,n)=>{r?this.emit("error",a.nativeError(r,t)):(this.emit("info",n),this.push(i)),this.push(null),this.on("end",()=>this.emit("close"))})}),this.streamInFinished&&this.emit("finish")):de.pipeline(this.options,(r,i,n)=>{r?this.emit("error",a.nativeError(r,t)):(this.emit("info",n),this.push(i)),this.push(null),this.on("end",()=>this.emit("close"))}),this):this._isStreamInput()?new Promise((r,i)=>{this.once("finish",()=>{this._flattenBufferIn(),de.pipeline(this.options,(n,s,o)=>{n?i(a.nativeError(n,t)):this.options.resolveWithObject?r({data:s,info:o}):r(s)})})}):new Promise((r,i)=>{de.pipeline(this.options,(n,s,o)=>{n?i(a.nativeError(n,t)):this.options.resolveWithObject?r({data:s,info:o}):r(s)})})}Ki.exports=function(e){Object.assign(e.prototype,{toFile:Do,toBuffer:zo,keepExif:Uo,withExif:Go,withExifMerge:Wo,keepIccProfile:Ho,withIccProfile:Vo,keepMetadata:Xo,withMetadata:Qo,toFormat:Jo,jpeg:Ko,jp2:tl,png:Yo,webp:Zo,tiff:rl,avif:il,heif:nl,jxl:al,gif:el,raw:sl,tile:ol,timeout:ll,_updateFormatOut:cl,_setBooleanOption:dl,_read:fl,_pipeline:hl})}});var rn=v((xc,tn)=>{"use strict";var ul=require("node:events"),Ve=$e(),M=_(),{runtimePlatformArch:ml}=ft(),F=be(),Zi=ml(),Pt=F.libvipsVersion(),K=F.format();K.heif.output.alias=["avif","heic"];K.jpeg.output.alias=["jpe","jpg"];K.tiff.output.alias=["tif"];K.jp2k.output.alias=["j2c","j2k","jp2","jpx"];var pl={nearest:"nearest",bilinear:"bilinear",bicubic:"bicubic",locallyBoundedBicubic:"lbb",nohalo:"nohalo",vertexSplitQuadraticBasisSpline:"vsqbs"},fe={vips:Pt.semver};if(!Pt.isGlobal)if(Pt.isWasm)try{fe=require("@img/sharp-wasm32/versions")}catch{}else try{fe=require(`@img/sharp-${Zi}/versions`)}catch{try{fe=require(`@img/sharp-libvips-${Zi}/versions`)}catch{}}fe.sharp=ct().version;fe.heif&&K.heif&&(K.heif.input.fileSuffix=[".avif"],K.heif.output.alias=["avif"]);function en(e){return M.bool(e)?e?F.cache(50,20,100):F.cache(0,0,0):M.object(e)?F.cache(e.memory,e.files,e.items):F.cache()}en(!0);function gl(e){return F.concurrency(M.integer(e)?e:null)}Ve.familySync()===Ve.GLIBC&&!F._isUsingJemalloc()?F.concurrency(1):Ve.familySync()===Ve.MUSL&&F.concurrency()===1024&&F.concurrency(require("node:os").availableParallelism());var bl=new ul.EventEmitter;function vl(){return F.counters()}function wl(e){return F.simd(M.bool(e)?e:null)}function yl(e){if(M.object(e))if(Array.isArray(e.operation)&&e.operation.every(M.string))F.block(e.operation,!0);else throw M.invalidParameterError("operation","Array<string>",e.operation);else throw M.invalidParameterError("options","object",e)}function El(e){if(M.object(e))if(Array.isArray(e.operation)&&e.operation.every(M.string))F.block(e.operation,!1);else throw M.invalidParameterError("operation","Array<string>",e.operation);else throw M.invalidParameterError("options","object",e)}tn.exports=function(e){e.cache=en,e.concurrency=gl,e.counters=vl,e.simd=wl,e.format=K,e.interpolators=pl,e.versions=fe,e.queue=bl,e.block=yl,e.unblock=El}});var It=v((Pc,nn)=>{"use strict";var H=ci();$i()(H);Ti()(H);Oi()(H);Di()(H);Gi()(H);Hi()(H);Yi()(H);rn()(H);nn.exports=H});var Rl={};fn(Rl,{activate:()=>Il,deactivate:()=>kl});module.exports=hn(Rl);var Qe=N(require("vscode"));var ue=N(require("vscode"));var R=N(require("fs")),q=N(require("path")),re=N(require("vscode")),Je="flutterProjects",Pe;function At(e){Pe=e.globalState}function Ie(){return Pe?.get(Je)||[]}async function St(){let e=await re.window.showOpenDialog({canSelectFiles:!1,canSelectFolders:!0,canSelectMany:!1,title:"Select Flutter Project Folder"});if(e&&e[0]){let t=e[0].fsPath;try{let r=q.join(t,"pubspec.yaml");if(R.existsSync(r)){let i=R.readFileSync(r,"utf8");if(i.includes("flutter:")||i.includes("sdk: flutter")){let n=Ie();n.includes(t)||(n.push(t),await Pe?.update(Je,n),re.window.showInformationMessage("Flutter project added!"));return}}re.window.showErrorMessage("Selected folder is not a Flutter project")}catch(r){re.window.showErrorMessage(`Error adding project: ${r}`)}}}function $t(e){try{let t="Unknown",r=q.join(e,"android","app","src","main","AndroidManifest.xml");if(R.existsSync(r)){let d=R.readFileSync(r,"utf8").match(/android:label=["']([^"']+)["']/);d?.[1]&&(t=d[1])}if(t==="Unknown"){let l=q.join(e,"pubspec.yaml");R.existsSync(l)&&(t=R.readFileSync(l,"utf8").match(/name:\s*(.*)/)?.[1]?.trim()||"Unknown")}let i="",n=q.join(e,"android","app"),s=q.join(n,"build.gradle"),o=q.join(n,"build.gradle.kts");if(R.existsSync(o)){let d=R.readFileSync(o,"utf8").match(/applicationId\s*=\s*"([\w.]+)"/);d?.[1]&&(i=d[1],console.log("Found package name from build.gradle.kts:",i))}else if(R.existsSync(s)){let d=R.readFileSync(s,"utf8").match(/applicationId\s*=?\s*['"]([\w.]+)['"]/);d?.[1]&&(i=d[1],console.log("Found package name from build.gradle:",i))}if(!i){let l=q.join(e,"ios","Runner","Info.plist");if(R.existsSync(l)){let h=R.readFileSync(l,"utf8").match(/<key>CFBundleIdentifier<\/key>\s*<string>([^<]+)<\/string>/);if(h?.[1]){let b=h[1];if(b==="$(PRODUCT_BUNDLE_IDENTIFIER)"){let w=q.join(e,"ios","Runner.xcodeproj","project.pbxproj");if(R.existsSync(w)){let Rt=R.readFileSync(w,"utf8").match(/PRODUCT_BUNDLE_IDENTIFIER\s*=\s*"([^"]+)"/);Rt?.[1]&&(b=Rt[1])}}b&&b!=="$(PRODUCT_BUNDLE_IDENTIFIER)"&&(i=b)}}}return i||(i=`com.example.${t.toLowerCase().replace(/[^a-z0-9]/g,"")}`),{appName:t,packageName:i,paths:{android:R.existsSync(q.join(e,"android")),ios:R.existsSync(q.join(e,"ios"))}}}catch(t){return re.window.showErrorMessage(`Error getting project details: ${t}`),{appName:"Unknown",packageName:"com.example.app",paths:{android:!1,ios:!1}}}}async function Lt(e){let r=Ie().filter(i=>i!==e);await Pe?.update(Je,r)}var Xe=N(require("vscode"));var ke=class{static getTabContent(t){return`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        padding: 32px;
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-foreground);
                        margin: 0 auto;
                        max-width: 800px;
                    }
                    h2 {
                        margin-bottom: 24px;
                        font-size: 24px;
                        font-weight: 500;
                    }
                    .project-info {
                        background: var(--vscode-textBlockQuote-background);
                        border-left: 4px solid var(--vscode-textBlockQuote-border);
                        padding: 16px;
                        margin-bottom: 32px;
                        border-radius: 6px;
                    }
                    .project-info h3 {
                        margin: 0 0 8px 0;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .project-path {
                        font-family: var(--vscode-editor-font-family);
                        font-size: 13px;
                        color: var(--vscode-textPreformat-foreground);
                        word-break: break-all;
                        padding: 4px 8px;
                        border-radius: 4px;
                    }
                    .icon-section {
                        border: 2px dashed var(--vscode-input-border);
                        border-radius: 8px;
                        padding: 32px;
                        text-align: center;
                        margin-bottom: 24px;
                    }
                    .icon-preview {
                        max-width: 200px;
                        max-height: 200px;
                        margin-bottom: 16px;
                        background: var(--vscode-editor-background);
                        border-radius: 8px;
                        padding: 8px;
                    }
                    .upload-button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        margin-right: 8px;
                    }
                    .description {
                        font-size: 13px;
                        color: var(--vscode-descriptionForeground);
                        margin-top: 16px;
                    }
                    .platform-selection {
                        margin-top: 24px;
                        padding: 16px;
                        background: var(--vscode-editor-background);
                        border-radius: 8px;
                    }
                    .checkbox-group {
                        display: flex;
                        gap: 24px;
                        margin-top: 12px;
                    }
                    .checkbox-wrapper {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .checkbox-wrapper input[type="checkbox"] {
                        width: 16px;
                        height: 16px;
                        margin: 0;
                        cursor: pointer;
                    }
                    .checkbox-wrapper label {
                        margin: 0;
                        cursor: pointer;
                    }
                    .apply-button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        margin-top: 24px;
                        min-width: 200px;
                    }
                    .apply-button:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    .status-message {
                        margin-top: 16px;
                        padding: 12px;
                        border-radius: 6px;
                        display: none;
                    }
                    .success-message {
                        background: var(--vscode-terminal-ansiGreen);
                        color: var(--vscode-editor-background);
                    }
                    .error-message {
                        background: var(--vscode-terminal-ansiRed);
                        color: var(--vscode-editor-background);
                    }
                </style>
            </head>
            <body>
                <h2>Change App Icon</h2>
                
                <div class="project-info">
                    <h3>Current Project</h3>
                    <div class="project-path">${t}</div>
                </div>
                
                <div class="icon-section">
                    <img id="iconPreview" class="icon-preview" src="" style="display: none;">
                    <div id="uploadPrompt">
                        <p>Click the button below to select an image</p>
                    </div>
                    <div>
                        <input type="file" id="iconInput" accept="image/png" style="display: none;">
                        <button class="upload-button" onclick="document.getElementById('iconInput').click()">Select Icon</button>
                        <button class="upload-button" id="clearButton" style="display: none;" onclick="clearIcon()">Clear</button>
                    </div>
                    <div class="description">
                        Recommended size: 1024x1024 pixels<br>
                        Supported formats: PNG
                    </div>
                </div>

                <div class="platform-selection">
                    <h3>Select platforms to update:</h3>
                    <div class="checkbox-group">
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="androidPlatform" checked>
                            <label for="androidPlatform">Android</label>
                        </div>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="iosPlatform" checked>
                            <label for="iosPlatform">iOS</label>
                        </div>
                    </div>
                </div>

                <div style="text-align: center;">
                    <button id="applyButton" class="apply-button" disabled onclick="applyIcon()">Update App Icon</button>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();
                    let iconData = null;
                    
                    // Set up file input listener
                    document.getElementById('iconInput').addEventListener('change', handleFileSelect);
                    
                    function handleFileSelect(event) {
                        const file = event.target.files[0];
                        if (file) {
                            if (file.type === 'image/png') {
                                handleFile(file);
                            } else {
                                showMessage('Please select a PNG image', 'error');
                            }
                        }
                    }
                    
                    function handleFile(file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const img = document.getElementById('iconPreview');
                            img.src = e.target.result;
                            img.style.display = 'inline-block';
                            document.getElementById('uploadPrompt').style.display = 'none';
                            document.getElementById('clearButton').style.display = 'inline-block';
                            document.getElementById('applyButton').disabled = false;
                            
                            iconData = e.target.result.split(',')[1];
                        };
                        reader.readAsDataURL(file);
                    }
                    
                    function clearIcon() {
                        const img = document.getElementById('iconPreview');
                        img.src = '';
                        img.style.display = 'none';
                        document.getElementById('uploadPrompt').style.display = 'block';
                        document.getElementById('clearButton').style.display = 'none';
                        document.getElementById('iconInput').value = '';
                        document.getElementById('applyButton').disabled = true;
                        iconData = null;
                    }
                    
                    function applyIcon() {
                        if (!iconData) {
                            showMessage('Please select an icon image first', 'error');
                            return;
                        }
                        
                        const platforms = {
                            android: document.getElementById('androidPlatform').checked,
                            ios: document.getElementById('iosPlatform').checked
                        };
                        
                        if (!platforms.android && !platforms.ios) {
                            showMessage('Please select at least one platform', 'error');
                            return;
                        }
                        
                        const applyButton = document.getElementById('applyButton');
                        applyButton.disabled = true;
                        applyButton.textContent = 'Updating...';
                        
                        vscode.postMessage({
                            command: 'updateIcon',
                            projectPath: '${t}',
                            iconData: iconData,
                            platforms: platforms
                        });
                    }
                    
                    function showMessage(message, type) {
                        const statusElement = document.getElementById('statusMessage');
                        statusElement.textContent = message;
                        statusElement.className = 'status-message ' + (type === 'error' ? 'error-message' : 'success-message');
                        statusElement.style.display = 'block';
                        
                        // Auto-hide after 5 seconds
                        setTimeout(() => {
                            statusElement.style.display = 'none';
                        }, 5000);
                    }
                    
                    // Listen for messages from the extension
                    window.addEventListener('message', event => {
                        const message = event.data;
                        
                        if (message.command === 'iconUpdateSuccess') {   
                            // Reset UI state
                            const img = document.getElementById('iconPreview');
                            img.src = '';
                            img.style.display = 'none';
                            document.getElementById('uploadPrompt').style.display = 'block';
                            document.getElementById('clearButton').style.display = 'none';
                            document.getElementById('iconInput').value = '';
                            iconData = null;
                            
                            // Reset button state
                            const applyButton = document.getElementById('applyButton');
                            applyButton.disabled = true;
                            applyButton.textContent = 'Update App Icon';
                            
                            showMessage(message.message || 'App icon updated successfully!', 'success');
                        } else if (message.command === 'iconUpdateError') {
                            showMessage(message.message || 'Error updating icon', 'error');
                            const applyButton = document.getElementById('applyButton');
                            applyButton.disabled = false;
                            applyButton.textContent = 'Update App Icon';
                        }
                    });
                </script>
            </body>
            </html>
        `}};var j=N(require("fs")),Y=N(require("path")),Ke=N(require("vscode"));function Re(e,t,r,i){try{if(i.android){let s=Y.join(e,"android","app"),o=Y.join(s,"build.gradle"),l=Y.join(s,"build.gradle.kts");if(j.existsSync(l)){let h=j.readFileSync(l,"utf8");h=h.replace(/applicationId\s*=\s*"[^"]+"/g,`applicationId = "${r}"`),j.writeFileSync(l,h,"utf8")}else if(j.existsSync(o)){let h=j.readFileSync(o,"utf8");h=h.replace(/applicationId\s*=\s*["'][^"']+["']/g,`applicationId = "${r}"`),j.writeFileSync(o,h,"utf8")}let d=Y.join(e,"android","app","src","main","AndroidManifest.xml");if(j.existsSync(d)){let h=j.readFileSync(d,"utf8");h=h.replace(/android:label=["'][^"']*["']/g,`android:label="${t}"`),j.writeFileSync(d,h,"utf8")}}if(i.ios){let s=Y.join(e,"ios","Runner","Info.plist");if(j.existsSync(s)){let o=j.readFileSync(s,"utf8");o=o.replace(/(<key>CFBundleDisplayName<\/key>\s*<string>)[^<]+(<\/string>)/,`$1${t}$2`),j.writeFileSync(s,o,"utf8");let l=Y.join(e,"ios","Runner.xcodeproj","project.pbxproj");if(j.existsSync(l)){let d=j.readFileSync(l,"utf8");d=d.replace(/PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g,`PRODUCT_BUNDLE_IDENTIFIER = ${r};`),j.writeFileSync(l,d,"utf8")}}}let n=[];i.android&&n.push("Android"),i.ios&&n.push("iOS"),Ke.window.showInformationMessage(`Project updated successfully!
              App Name: ${t}
              Package Name: ${r}
              Platforms: ${n.join(", ")}`)}catch(n){throw Ke.window.showErrorMessage(`Error updating project: ${n}`),n}}var je=class{static getTabContent(t){let{appName:r,packageName:i}=$t(t);return`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        padding: 0;
                        margin: 0;
                        font-family: var(--vscode-font-family);
                        color: var(--vscode-foreground);
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 40px;
                    }
                    .header {
                        margin-bottom: 32px;
                    }
                    .header h2 {
                        margin: 0 0 8px 0;
                        font-size: 24px;
                        font-weight: 500;
                        color: var(--vscode-foreground);
                    }
                    .header p {
                        margin: 0;
                        color: var(--vscode-descriptionForeground);
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    .project-info {
                        background: var(--vscode-textBlockQuote-background);
                        border-left: 4px solid var(--vscode-textBlockQuote-border);
                        padding: 16px;
                        margin-bottom: 32px;
                        border-radius: 6px;
                    }
                    .project-info h3 {
                        margin: 0 0 8px 0;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    .project-path {
                        font-family: var(--vscode-editor-font-family);
                        font-size: 13px;
                        color: var(--vscode-textPreformat-foreground);
                        word-break: break-all;
                        padding: 4px 8px;
                        border-radius: 4px;
                    }
                    .form-section {
                        background: var(--vscode-editor-background);
                        border-radius: 8px;
                        padding: 24px;
                        margin-bottom: 24px;
                    }
                    .form-group {
                        margin-bottom: 24px;
                        position: relative;
                    }
                    .form-group:last-child {
                        margin-bottom: 0;
                    }
                    label {
                        display: block;
                        margin-bottom: 8px;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .input-wrapper {
                        position: relative;
                    }
                    input {
                        width: 100%;
                        padding: 10px 12px;
                        background: var(--vscode-input-background);
                        color: var(--vscode-input-foreground);
                        border: 1px solid var(--vscode-input-border);
                        border-radius: 6px;
                        font-size: 14px;
                        transition: border-color 0.2s;
                    }
                    input:focus {
                        outline: none;
                        border-color: var(--vscode-focusBorder);
                    }
                    .error-message {
                        color: var(--vscode-errorForeground);
                        font-size: 12px;
                        margin-top: 4px;
                        display: none;
                    }
                    .form-group.error input {
                        border-color: var(--vscode-errorForeground);
                    }
                    .form-group.error .error-message {
                        display: block;
                    }
                    .form-group.error input:focus {
                        border-color: var(--vscode-errorForeground);
                        box-shadow: 0 0 0 1px var(--vscode-errorForeground);
                    }
                    .actions {
                        margin-top: 32px;
                        display: flex;
                        gap: 12px;
                        justify-content: center;
                    }

                    .primary-button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 12px 24px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        min-width: 200px;
                    }
                        font-size: 13px;
                        font-weight: 500;
                        min-width: 200px;
                        transition: background-color 0.2s;
                    }
                    .primary-button:hover {
                        background: var(--vscode-button-hoverBackground);
                    }
                    .primary-button:disabled {
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    .loading {
                        pointer-events: none;
                        opacity: 0.7;
                    }
                    .platform-selection {
                        margin-top: 24px;
                        padding-top: 24px;
                    }
                    
                    .platform-selection h3 {
                        margin: 0 0 16px 0;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    
                    .checkbox-group {
                        display: flex;
                        gap: 24px;
                    }
                    
                    .checkbox-wrapper {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .checkbox-wrapper input[type="checkbox"] {
                        width: 16px;
                        height: 16px;
                        margin: 0;
                        cursor: pointer;
                    }
                    
                    .checkbox-wrapper label {
                        margin: 0;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .platform-icon {
                        width: 16px;
                        height: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .checkbox-wrapper.disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    
                    .checkbox-wrapper.disabled * {
                        cursor: not-allowed;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Rename Flutter Project</h2>
                        <p>Update your app's display name and package identifier</p>
                    </div>

                    <div class="project-info">
                        <h3>Current Project</h3>
                        <div class="project-path">${t}</div>
                    </div>

                    <form id="renameForm" class="form-section">
                        <div class="form-group" id="appNameGroup">
                            <label for="appName">App Name</label>
                            <div class="input-wrapper">
                                <input 
                                    type="text"
                                    id="appName" 
                                    value="${r}" 
                                    placeholder="My Awesome App"
                                    onInput="validateInputs()"
                                >
                            </div>
                            <div class="error-message" id="appNameError"></div>
                        </div>

                        <div class="form-group" id="packageNameGroup">
                            <label for="packageName">Package Name</label>
                            <div class="input-wrapper">
                                <input 
                                    type="text"
                                    id="packageName" 
                                    value="${i}" 
                                    placeholder="com.example.myapp"
                                    onInput="validateInputs()"
                                >
                            </div>
                            <div class="error-message" id="packageNameError"></div>
                        </div>

                        <div class="platform-selection">
                            <h3>Select Platforms to Rename</h3>
                            <div class="checkbox-group">
                                <div class="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="androidPlatform"
                                        checked 
                                        onChange="validateInputs()"
                                    >
                                    <label for="androidPlatform">Android</label>
                                </div>
                                <div class="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="iosPlatform"
                                        checked 
                                        onChange="validateInputs()"
                                    >
                                    <label for="iosPlatform">iOS</label>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div class="actions">
                        <button id="renameButton" class="primary-button" onclick="submitForm()" disabled>
                            Update Project
                        </button>
                    </div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();

                    function showError(elementId, errorMessage) {
                        const group = document.getElementById(elementId + 'Group');
                        const errorElement = document.getElementById(elementId + 'Error');
                        
                        if (errorMessage) {
                            group.classList.add('error');
                            errorElement.textContent = errorMessage;
                        } else {
                            group.classList.remove('error');
                            errorElement.textContent = '';
                        }
                    }

                    function validateInputs() {
                        const appName = document.getElementById('appName').value.trim();
                        const packageName = document.getElementById('packageName').value.trim();
                        const android = document.getElementById('androidPlatform').checked;
                        const ios = document.getElementById('iosPlatform').checked;
                        const button = document.getElementById('renameButton');

                        let isValid = true;

                        // Validate app name
                        if (!appName) {
                            showError('appName', 'App name is required');
                            isValid = false;
                        } else if (appName.length < 2) {
                            showError('appName', 'App name must be at least 2 characters');
                            isValid = false;
                        } else {
                            showError('appName', '');
                        }

                        // Validate package name
                        if (!packageName) {
                            showError('packageName', 'Package name is required');
                            isValid = false;
                        } else if (!/^[a-z][a-z0-9_]*(.[a-z0-9_]+)+$/.test(packageName)) {
                            showError('packageName', 'Invalid package name format (e.g., com.example.myapp)');
                            isValid = false;
                        } else {
                            showError('packageName', '');
                        }

                        // Validate platforms
                        if (!android && !ios) {
                            isValid = false;
                        }

                        // Enable/disable button
                        button.disabled = !isValid;
                    }

                    function submitForm() {
                        const appName = document.getElementById('appName').value.trim();
                        const packageName = document.getElementById('packageName').value.trim();
                        const android = document.getElementById('androidPlatform').checked;
                        const ios = document.getElementById('iosPlatform').checked;

                        vscode.postMessage({
                            command: 'rename',
                            newAppName: appName,
                            newPackageName: packageName,
                            platforms: {
                                android,
                                ios
                            }
                        });

                        document.getElementById('renameButton').disabled = true;
                        document.body.classList.add('loading');
                    }

                    // Run initial validation
                    validateInputs();
                </script>
            </body>
            </html>
        `}static handleRenameMessage(t,r){r.command==="rename"&&Re(t,r.newAppName,r.newPackageName,r.platforms)}};var I=N(require("fs")),S=N(require("path")),kt=N(require("vscode"));async function an(e,t,r){try{let i=S.join(e,".flutter-build-temp");I.existsSync(i)||I.mkdirSync(i);let n=S.join(i,"original_icon.png");I.writeFileSync(n,Buffer.from(t,"base64")),r.android&&await xl(e,n),r.ios&&await Pl(e,n),I.unlinkSync(n),I.rmdirSync(i);let s=[];r.android&&s.push("Android"),r.ios&&s.push("iOS"),kt.window.showInformationMessage(`App icon updated successfully for ${s.join(", ")}!`)}catch(i){throw kt.window.showErrorMessage(`Error updating app icon: ${i}`),i}}async function xl(e,t){let r=[{dir:"mipmap-mdpi",size:48},{dir:"mipmap-hdpi",size:72},{dir:"mipmap-xhdpi",size:96},{dir:"mipmap-xxhdpi",size:144},{dir:"mipmap-xxxhdpi",size:192}],i=await Promise.resolve().then(()=>N(It()));for(let{dir:h,size:b}of r){let w=S.join(e,"android","app","src","main","res",h);I.existsSync(w)||I.mkdirSync(w,{recursive:!0}),await i.default(t).resize(b,b).toFile(S.join(w,"ic_launcher.png")),await i.default(t).resize(b,b).toFile(S.join(w,"ic_launcher_round.png"))}let n=S.join(e,"android","app","src","main","res","mipmap-anydpi-v26");I.existsSync(n)||I.mkdirSync(n,{recursive:!0});let s=`<?xml version="1.0" encoding="utf-8"?>
  <adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
      <background android:drawable="@color/ic_launcher_background"/>
      <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
  </adaptive-icon>`;I.writeFileSync(S.join(n,"ic_launcher.xml"),s),I.writeFileSync(S.join(n,"ic_launcher_round.xml"),s);let o=S.join(e,"android","app","src","main","res","mipmap-xxxhdpi");await i.default(t).resize(192,192).extend({top:48,bottom:48,left:48,right:48,background:{r:0,g:0,b:0,alpha:0}}).toFile(S.join(o,"ic_launcher_foreground.png"));let l=S.join(e,"android","app","src","main","res","values");I.existsSync(l)||I.mkdirSync(l,{recursive:!0}),I.writeFileSync(S.join(l,"ic_launcher_background.xml"),`<?xml version="1.0" encoding="utf-8"?>
  <resources>
      <color name="ic_launcher_background">#FFFFFF</color>
  </resources>`)}async function Pl(e,t){let r=[{size:20,scales:[1,2,3]},{size:29,scales:[1,2,3]},{size:40,scales:[1,2,3]},{size:60,scales:[2,3]},{size:76,scales:[1,2]},{size:83.5,scales:[2]},{size:1024,scales:[1]}],i=await Promise.resolve().then(()=>N(It())),n=S.join(e,"ios","Runner","Assets.xcassets","AppIcon.appiconset");I.existsSync(n)||I.mkdirSync(n,{recursive:!0});let s={images:[],info:{version:1,author:"flutter-build"}};for(let{size:o,scales:l}of r)for(let d of l){let h=Math.floor(o*d),b=`Icon-App-${o}x${o}@${d}x.png`;s.images.push({size:`${o}x${o}`,idiom:o===1024?"ios-marketing":"iphone",filename:b,scale:`${d}x`}),await i.default(t).resize(h,h).toFile(S.join(n,b))}I.writeFileSync(S.join(n,"Contents.json"),JSON.stringify(s,null,2))}var he=class{static currentTabs=new Map;static show(t,r){let i=t.split("/").pop()||"Flutter Project",n=`flutter-build-${r}-${t}`;if(this.currentTabs.has(n)){this.currentTabs.get(n)?.reveal();return}let s=Xe.window.createWebviewPanel("flutterBuildTab",`${i} - ${r==="rename"?"Rename App":"Change App Icon"}`,Xe.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0});s.webview.html=this.getTabHtml(t,r),s.webview.onDidReceiveMessage(async o=>{if(o.command==="rename")try{Re(t,o.newAppName,o.newPackageName,o.platforms),s.webview.html=this.getTabHtml(t,r),s.webview.postMessage({command:"renameSuccess",message:"Project renamed successfully!",autoHide:!0,hideAfter:3e3})}catch(l){s.webview.postMessage({command:"renameError",message:`Error: ${l}`,autoHide:!0,hideAfter:3e3})}else if(o.command==="updateIcon")try{await an(o.projectPath,o.iconData,o.platforms),s.webview.postMessage({command:"iconUpdateSuccess",message:"App icon updated successfully!",autoHide:!0,hideAfter:3e3})}catch(l){s.webview.postMessage({command:"iconUpdateError",message:`Error updating app icon: ${l}`,autoHide:!0,hideAfter:3e3})}}),s.onDidDispose(()=>{this.currentTabs.delete(n)}),this.currentTabs.set(n,s),s.reveal()}static getTabHtml(t,r){return r==="rename"?je.getTabContent(t):ke.getTabContent(t)}};var Ee=class{constructor(t){this._context=t}static viewType="flutter-build-view";_view;updateView(){if(this._view){let t=Ie(),r=t.map(i=>`
                <div class="project-item" onclick="showProjectMenu('${i}')">
                    <div class="project-info">
                        <div class="project-icon">
                            <i class="codicon codicon-folder"></i>
                        </div>
                        <div class="project-details">
                            <span class="project-name">${i.split("/").pop()}</span>
                            <span class="project-path">${i}</span>
                        </div>
                    </div>
                    <div class="project-actions">
                        <button class="action-btn" onclick="event.stopPropagation(); removeProject('${i}')" title="Remove from History">
                            <i class="codicon codicon-trash"></i>
                        </button>
                    </div>
                </div>
            `).join("");this._view.webview.html=this._getWebviewContent(r,t)}}resolveWebviewView(t){this._view=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._context.extensionUri]},this.updateView(),t.webview.onDidReceiveMessage(async r=>{switch(r.command){case"openProject":break;case"openProjectDialog":await St(),this.updateView();break;case"removeProject":await Lt(r.projectPath),this.updateView();break;case"createNewProject":await ue.commands.executeCommand("flutter.createProject");break;case"showProjectMenu":let i=[{label:"Rename App Name & Package",description:"Rename the app name and package name of the project",type:"rename"},{label:"Change App Icon",description:"Update the app icon of the project",type:"icon"}],n=await ue.window.showQuickPick(i,{placeHolder:"Select an action"});n&&he.show(r.projectPath,n.type);break}})}_getWebviewContent(t,r){return`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="${this._view?.webview.asWebviewUri(ue.Uri.joinPath(this._context.extensionUri,"node_modules","@vscode/codicons","dist","codicon.css"))}">
                <style>
                    body {
                        padding: 16px;
                        color: var(--vscode-foreground);
                        font-family: var(--vscode-font-family);
                    }

                    .header {
                        margin-bottom: 20px;
                    }

                    .primary-btn {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: background-color 0.2s;
                    }

                    .primary-btn:hover {
                        background: var(--vscode-button-hoverBackground);
                    }

                    .project-list {
                        margin-top: 16px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .project-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px;
                        background: var(--vscode-list-hoverBackground);
                        border-radius: 6px;
                        transition: all 0.2s;
                        position: relative;
                    }

                    .project-item:hover {
                        background: var(--vscode-list-activeSelectionBackground);
                    }

                    .project-info {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        flex: 1;
                        min-width: 0;
                    }

                    .project-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        background: rgba(68, 209, 253, 0.1);
                        border-radius: 8px;
                    }

                    .project-icon i {
                        font-size: 20px;
                        color: #44D1FD;
                    }

                    .project-details {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        min-width: 0;
                    }

                    .project-name {
                        font-weight: 500;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .project-path {
                        font-size: 11px;
                        color: var(--vscode-descriptionForeground);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .action-btn {
                        background: transparent;
                        border: none;
                        color: var(--vscode-foreground);
                        cursor: pointer;
                        padding: 6px;
                        border-radius: 4px;
                        display: flex;
                        align-items: center;
                        transition: all 0.2s;
                    }

                    .action-btn:hover {
                        background: var(--vscode-toolbar-hoverBackground);
                        color: #EE4B2B;
                    }

                    .empty-state {
                        text-align: center;
                        padding: 32px 16px;
                    }

                    .empty-icon {
                        font-size: 48px;
                        margin-bottom: 16px;
                        color: #44D1FD;
                        opacity: 0.8;
                    }

                    .empty-title {
                        font-size: 16px;
                        font-weight: 500;
                        margin: 0 0 8px 0;
                    }

                    .empty-subtitle {
                        font-size: 12px;
                        line-height: 1.4;
                        margin: 0 0 24px 0;
                        color: var(--vscode-descriptionForeground);
                    }

                    .action-group {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .secondary-btn {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        background: transparent;
                        color: var(--vscode-foreground);
                        border: 1px solid var(--vscode-widget-border);
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: all 0.2s;
                    }

                    .secondary-btn:hover {
                        background: var(--vscode-toolbar-hoverBackground);
                    }
                </style>
            </head>
            <body>
                ${r.length>0?`
                    <div class="header">
                        <button class="primary-btn" onclick="openProjectDialog()">
                            <i class="codicon codicon-folder-opened"></i>
                            Open Project
                        </button>
                    </div>
                    <div class="project-list">
                        ${t}
                    </div>
                `:`
                    <div class="empty-state">
                        <i class="codicon codicon-flutter empty-icon"></i>
                        <h3 class="empty-title">No Flutter Projects Found</h3>
                        <p class="empty-subtitle">Open or create a Flutter project to get started</p>
                        
                        <div class="action-group">
                            <button class="primary-btn" onclick="openProjectDialog()">
                                <i class="codicon codicon-folder-opened"></i>
                                Open Project
                            </button>
                            <button class="secondary-btn" onclick="createNewProject()">
                                <i class="codicon codicon-new-file"></i>
                                Create New Project
                            </button>
                        </div>
                    </div>
                `}
                <script>
                    const vscode = acquireVsCodeApi();
                    
                    function showProjectMenu(projectPath) {
                        vscode.postMessage({ 
                            command: "showProjectMenu", 
                            projectPath 
                        });
                    }

                    function openProject(projectPath) {
                        vscode.postMessage({ command: "openProject", projectPath });
                    }

                    function openProjectDialog() {
                        vscode.postMessage({ command: "openProjectDialog" });
                    }

                    function removeProject(projectPath) {
                        vscode.postMessage({ command: "removeProject", projectPath });
                    }

                    function createNewProject() {
                        vscode.postMessage({ command: "createNewProject" });
                    }
                </script>
            </body>
            </html>
        `}};function Il(e){At(e);let t=new Ee(e);e.subscriptions.push(Qe.window.registerWebviewViewProvider(Ee.viewType,t,{webviewOptions:{retainContextWhenHidden:!0}})),e.subscriptions.push(Qe.commands.registerCommand("flutter-build.start",r=>{he.show(r,"rename")}))}function kl(){}0&&(module.exports={activate,deactivate});
