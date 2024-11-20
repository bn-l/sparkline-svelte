var ae=Object.defineProperty;var Dt=e=>{throw TypeError(e)};var le=(e,t,n)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var At=(e,t,n)=>le(e,typeof t!="symbol"?t+"":t,n),ft=(e,t,n)=>t.has(e)||Dt("Cannot "+n);var j=(e,t,n)=>(ft(e,t,"read from private field"),n?n.call(e):t.get(e)),U=(e,t,n)=>t.has(e)?Dt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),bt=(e,t,n,r)=>(ft(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),Ht=(e,t,n)=>(ft(e,t,"access private method"),n);import{n as wt,a as tt,t as qt}from"../chunks/disclose-version.Ch3PDx1e.js";import{x as Tt,h as ot,as as ue,at as ce,ae as he,P as de,l as pe,p as Yt,k as xt,i as o,o as d,aq as I,D as b,v as z,s as C,f as ve,t as et,e as Vt,w as M}from"../chunks/runtime.Cg5oSnlZ.js";import{a as Gt,e as fe,d as Kt}from"../chunks/store.DeU8N9Gq.js";import{p as be,a as Y,i as yt,b as ge}from"../chunks/props.D0SBms_E.js";const me=/[&<]/g;function _e(e,t){const n=String(e),r=me;r.lastIndex=0;let s="",a=0;for(;r.test(n);){const l=r.lastIndex-1,h=n[l];s+=n.substring(a,l)+(h==="&"?"&amp;":h==='"'?"&quot;":"&lt;"),a=l+1}return s+n.substring(a)}function f(e,t,n,r){var s=e.__attributes??(e.__attributes={});ot&&(s[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName==="LINK")||s[t]!==(s[t]=n)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[ue]=n),n==null?e.removeAttribute(t):typeof n!="string"&&xe(e).includes(t)?e[t]=n:e.setAttribute(t,n))}var zt=new Map;function xe(e){var t=zt.get(e.nodeName);if(t)return t;zt.set(e.nodeName,t=[]);for(var n,r=Tt(e),s=Element.prototype;s!==r;){n=ce(r);for(var a in n)n[a].set&&t.push(a);r=Tt(r)}return t}function ye(e,t){var n=e.__className,r=Zt(t);ot&&e.getAttribute("class")===r?e.__className=r:(n!==r||ot&&e.getAttribute("class")!==r)&&(r===""?e.removeAttribute("class"):e.setAttribute("class",r),e.__className=r)}function ke(e,t){var n=e.__className,r=Zt(t);ot&&e.className===r?e.__className=r:(n!==r||ot&&e.className!==r)&&(t==null?e.removeAttribute("class"):e.className=r,e.__className=r)}function Zt(e){return e??""}function Pt(e,t,n,r){var s=e.__styles??(e.__styles={});s[t]!==n&&(s[t]=n,n==null?e.style.removeProperty(t):e.style.setProperty(t,n,""))}var B,V,rt,ht,Qt;const dt=class dt{constructor(t){U(this,ht);U(this,B,new WeakMap);U(this,V);U(this,rt);bt(this,rt,t)}observe(t,n){var r=j(this,B).get(t)||new Set;return r.add(n),j(this,B).set(t,r),Ht(this,ht,Qt).call(this).observe(t,j(this,rt)),()=>{var s=j(this,B).get(t);s.delete(n),s.size===0&&(j(this,B).delete(t),j(this,V).unobserve(t))}}};B=new WeakMap,V=new WeakMap,rt=new WeakMap,ht=new WeakSet,Qt=function(){return j(this,V)??bt(this,V,new ResizeObserver(t=>{for(var n of t){dt.entries.set(n.target,n);for(var r of j(this,B).get(n.target)||[])r(n)}}))},At(dt,"entries",new WeakMap);let kt=dt;var Ut=new kt({box:"border-box"});function we(e,t,n){var r=Ut,s=r.observe(e,a=>n(a[t]));he(s)}function Wt(e,t,n){var r=Ut.observe(e,()=>n(e[t]));de(()=>(pe(()=>n(e[t])),r))}var $e={grad:.9,turn:360,rad:360/(2*Math.PI)},F=function(e){return typeof e=="string"?e.length>0:typeof e=="number"},v=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=Math.pow(10,t)),Math.round(n*e)/n+0},w=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=1),e>n?n:e>t?e:t},te=function(e){return(e=isFinite(e)?e%360:0)>0?e:e+360},jt=function(e){return{r:w(e.r,0,255),g:w(e.g,0,255),b:w(e.b,0,255),a:w(e.a)}},gt=function(e){return{r:v(e.r),g:v(e.g),b:v(e.b),a:v(e.a,3)}},Ne=/^#([0-9a-f]{3,8})$/i,ct=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},ee=function(e){var t=e.r,n=e.g,r=e.b,s=e.a,a=Math.max(t,n,r),l=a-Math.min(t,n,r),h=l?a===t?(n-r)/l:a===n?2+(r-t)/l:4+(t-n)/l:0;return{h:60*(h<0?h+6:h),s:a?l/a*100:0,v:a/255*100,a:s}},ne=function(e){var t=e.h,n=e.s,r=e.v,s=e.a;t=t/360*6,n/=100,r/=100;var a=Math.floor(t),l=r*(1-n),h=r*(1-(t-a)*n),S=r*(1-(1-t+a)*n),O=a%6;return{r:255*[r,h,l,l,S,r][O],g:255*[S,r,r,h,l,l][O],b:255*[l,l,S,r,r,h][O],a:s}},Ft=function(e){return{h:te(e.h),s:w(e.s,0,100),l:w(e.l,0,100),a:w(e.a)}},Ot=function(e){return{h:v(e.h),s:v(e.s),l:v(e.l),a:v(e.a,3)}},Xt=function(e){return ne((n=(t=e).s,{h:t.h,s:(n*=((r=t.l)<50?r:100-r)/100)>0?2*n/(r+n)*100:0,v:r+n,a:t.a}));var t,n,r},nt=function(e){return{h:(t=ee(e)).h,s:(s=(200-(n=t.s))*(r=t.v)/100)>0&&s<200?n*r/100/(s<=100?s:200-s)*100:0,l:s/2,a:t.a};var t,n,r,s},Ce=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Me=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ie=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Se=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Bt={string:[[function(e){var t=Ne.exec(e);return t?(e=t[1]).length<=4?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?v(parseInt(e[3]+e[3],16)/255,2):1}:e.length===6||e.length===8?{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:e.length===8?v(parseInt(e.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(e){var t=Ie.exec(e)||Se.exec(e);return t?t[2]!==t[4]||t[4]!==t[6]?null:jt({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(e){var t=Ce.exec(e)||Me.exec(e);if(!t)return null;var n,r,s=Ft({h:(n=t[1],r=t[2],r===void 0&&(r="deg"),Number(n)*($e[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return Xt(s)},"hsl"]],object:[[function(e){var t=e.r,n=e.g,r=e.b,s=e.a,a=s===void 0?1:s;return F(t)&&F(n)&&F(r)?jt({r:Number(t),g:Number(n),b:Number(r),a:Number(a)}):null},"rgb"],[function(e){var t=e.h,n=e.s,r=e.l,s=e.a,a=s===void 0?1:s;if(!F(t)||!F(n)||!F(r))return null;var l=Ft({h:Number(t),s:Number(n),l:Number(r),a:Number(a)});return Xt(l)},"hsl"],[function(e){var t=e.h,n=e.s,r=e.v,s=e.a,a=s===void 0?1:s;if(!F(t)||!F(n)||!F(r))return null;var l=function(h){return{h:te(h.h),s:w(h.s,0,100),v:w(h.v,0,100),a:w(h.a)}}({h:Number(t),s:Number(n),v:Number(r),a:Number(a)});return ne(l)},"hsv"]]},Lt=function(e,t){for(var n=0;n<t.length;n++){var r=t[n][0](e);if(r)return[r,t[n][1]]}return[null,void 0]},Re=function(e){return typeof e=="string"?Lt(e.trim(),Bt.string):typeof e=="object"&&e!==null?Lt(e,Bt.object):[null,void 0]},mt=function(e,t){var n=nt(e);return{h:n.h,s:w(n.s+100*t,0,100),l:n.l,a:n.a}},_t=function(e){return(299*e.r+587*e.g+114*e.b)/1e3/255},Et=function(e,t){var n=nt(e);return{h:n.h,s:n.s,l:w(n.l+100*t,0,100),a:n.a}},Jt=function(){function e(t){this.parsed=Re(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return e.prototype.isValid=function(){return this.parsed!==null},e.prototype.brightness=function(){return v(_t(this.rgba),2)},e.prototype.isDark=function(){return _t(this.rgba)<.5},e.prototype.isLight=function(){return _t(this.rgba)>=.5},e.prototype.toHex=function(){return t=gt(this.rgba),n=t.r,r=t.g,s=t.b,l=(a=t.a)<1?ct(v(255*a)):"","#"+ct(n)+ct(r)+ct(s)+l;var t,n,r,s,a,l},e.prototype.toRgb=function(){return gt(this.rgba)},e.prototype.toRgbString=function(){return t=gt(this.rgba),n=t.r,r=t.g,s=t.b,(a=t.a)<1?"rgba("+n+", "+r+", "+s+", "+a+")":"rgb("+n+", "+r+", "+s+")";var t,n,r,s,a},e.prototype.toHsl=function(){return Ot(nt(this.rgba))},e.prototype.toHslString=function(){return t=Ot(nt(this.rgba)),n=t.h,r=t.s,s=t.l,(a=t.a)<1?"hsla("+n+", "+r+"%, "+s+"%, "+a+")":"hsl("+n+", "+r+"%, "+s+"%)";var t,n,r,s,a},e.prototype.toHsv=function(){return t=ee(this.rgba),{h:v(t.h),s:v(t.s),v:v(t.v),a:v(t.a,3)};var t},e.prototype.invert=function(){return k({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},e.prototype.saturate=function(t){return t===void 0&&(t=.1),k(mt(this.rgba,t))},e.prototype.desaturate=function(t){return t===void 0&&(t=.1),k(mt(this.rgba,-t))},e.prototype.grayscale=function(){return k(mt(this.rgba,-1))},e.prototype.lighten=function(t){return t===void 0&&(t=.1),k(Et(this.rgba,t))},e.prototype.darken=function(t){return t===void 0&&(t=.1),k(Et(this.rgba,-t))},e.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},e.prototype.alpha=function(t){return typeof t=="number"?k({r:(n=this.rgba).r,g:n.g,b:n.b,a:t}):v(this.rgba.a,3);var n},e.prototype.hue=function(t){var n=nt(this.rgba);return typeof t=="number"?k({h:t,s:n.s,l:n.l,a:n.a}):v(n.h)},e.prototype.isEqual=function(t){return this.toHex()===k(t).toHex()},e}(),k=function(e){return e instanceof Jt?e:new Jt(e)},De=wt('<foreignObject id="sparkline-tooltip-foreign-object"><div id="sparkline-tooltip-text"> </div></foreignObject>'),Ae=wt('<line id="sparkline-cursor-line" y1="0"></line><!>',1),He=wt('<svg id="sparkline-svg" preserveAspectRatio="none" aria-hidden="true" role="img" style="fill: none; touch-action: none;"><path id="sparkline-fill-path" class="svelte-1h3d8ne"></path><path id="sparkline-line-path" fill="none" stroke-linecap="square" class="svelte-1h3d8ne"></path><!></svg>');function Te(e,t){Yt(t,!0);let n=be(t,"cursorData",15,null);const r={svgWidth:"100%",svgHeight:"100%",strokeWidth:6,spotRadius:2,tooltipFontSize:"0.875rem",showTooltip:!0,cursorWidth:3};let s=d(()=>({...r,...t.options}));function a(i,c,u){return i=typeof i=="string"?k(i):i,i.isDark()!==u?i.darken(c):i.lighten(c)}const l=d(()=>{var y,P,W,Z,Q;const i=(y=o(s))!=null&&y.lineColor?k(o(s).lineColor):k("#FF476F"),c=((P=o(s))==null?void 0:P.fillColor)??a(i,.2,!1).toHex(),u=((W=o(s))==null?void 0:W.cursorColor)??a(i,.1,!0).toHex(),p=((Z=o(s))==null?void 0:Z.tooltipFillColor)??a(c,.1,!1).toHex(),N=((Q=o(s))==null?void 0:Q.tooltipTextColor)??a(p,.6,!0).toHex();return{lineColor:i.toHex(),fillColor:c,cursorColor:u,tooltipFillColor:p,tooltipTextColor:N}}),h=d(()=>o(l).lineColor),S=d(()=>o(l).fillColor),O=d(()=>o(l).cursorColor),G=d(()=>o(l).tooltipFillColor),K=d(()=>o(l).tooltipTextColor),L=d(()=>o(s).spotRadius*2),R=d(()=>{var i;return!!((i=o(s))!=null&&i.interactive)});let E=d(()=>Math.max(...t.data.map(i=>typeof i=="number"?i:i.value))),D=I(0),A=I(0),x=d(()=>{if(t.data.length<=1||o(D)===0||o(A)===0)return[];const i=o(D)-o(L)*2,c=o(A)-o(s).strokeWidth*2-o(L);return t.data.map((u,p)=>{const N=typeof u=="number"?u:u.value,_=typeof u=="number"?void 0:u.label;let y=p/(t.data.length-1)*i+o(L),P=o(A)-N/o(E)*c-(o(s).strokeWidth+o(s).spotRadius);return{x:y,y:P,value:N,label:_,index:p}})}),st=d(()=>o(x).length<=1?"":"M "+o(x).map(i=>`${i.x} ${i.y}`).join(" L ")),it=d(()=>o(x).length<=1?"":`${"M "+o(x).map(u=>({x:u.x,y:u.y+o(s).strokeWidth/2})).map(u=>`${u.x} ${u.y}`).join(" L ")} V ${o(A)} L ${o(x)[0].x} ${o(A)} Z`),$=I(null),H=I(!0),J=I(0),q,g=d(()=>{if(o(H)||!o(R)||!q)return null;const i=q.getBoundingClientRect(),u=(o(J)-i.left)/i.width*o(D);let p=o(x).find(W=>W.x>=u)??o(x)[o(x).length-1];const N=o(x).indexOf(p)-1,_=o(x)[N];let y,P;return _?(P=_.x+(p.x-_.x)/2,y=u>=P?p:_):y=p,y}),at=d(()=>o(H)||!o(g)?[0,0]:[o(g).x,o(g).y]),T=d(()=>o(at)[0]),X=d(()=>{if(o(H)||!o(g)||!o($))return[0,0];let i=o(g).x,c=o(g).y-o(s).spotRadius-10,u=i-o($)[0].inlineSize/2,p=c-o($)[0].blockSize;return u<0&&(u=0),u+o($)[0].inlineSize>o(D)&&(u=o(D)-o($)[0].inlineSize),p<0&&(p=0),[u,p]}),pt=d(()=>o(X)[0]),lt=d(()=>o(X)[1]);xt(()=>{o(g)!==null?n(o(g)):n(null)});function ut(i){b(H,!1),b(J,Y(i.clientX))}function oe(i){b(H,!1),b(J,Y(i.touches[0].clientX))}function re(i){b(H,!0)}function se(i){b(H,!0)}var m=He();m.__mousemove=function(...i){var c;(c=o(R)?ut:null)==null||c.apply(this,i)},m.__touchmove=function(...i){var c;(c=o(R)?oe:null)==null||c.apply(this,i)},m.__touchend=function(...i){var c;(c=o(R)?re:null)==null||c.apply(this,i)};var vt=C(m),$t=z(vt),ie=z($t);yt(ie,()=>o(R)&&!o(H),i=>{var c=Ae(),u=ve(c),p=z(u);yt(p,()=>{var N;return(N=o(s))==null?void 0:N.showTooltip},N=>{var _=De(),y=C(_),P=C(y,!0);M(y),M(_),et(()=>{var W,Z,Q,Nt,Ct,Mt,It,St,Rt;f(_,"x",o(pt)),f(_,"y",o(lt)),f(_,"width",((Z=(W=o($))==null?void 0:W[0])==null?void 0:Z.inlineSize)??0),f(_,"height",((Nt=(Q=o($))==null?void 0:Q[0])==null?void 0:Nt.blockSize)??0),ke(y,`${((Ct=o(s))==null?void 0:Ct.toolTipClass)??"tooltip-class"??""} svelte-1h3d8ne`),f(y,"style",`width: max-content; height: max-content; display: inline-flex; background-color: ${o(G)??""}; color: ${o(K)??""}; user-select: none; font-size: ${((Mt=o(s))==null?void 0:Mt.tooltipFontSize)??""}; border: 0rem solid ${o(h)??""}; max-width: ${o(D)??""}px;`),Gt(P,(It=o(g))!=null&&It.label?`${(St=o(g))==null?void 0:St.label}: ${o(g).value}`:`${(Rt=o(g))==null?void 0:Rt.value}`)}),we(y,"borderBoxSize",W=>b($,W)),tt(N,_)}),et(()=>{f(u,"style",`stroke: ${o(O)??""};`),f(u,"x1",o(T)),f(u,"x2",o(T)),f(u,"y2",o(A)),f(u,"stroke-width",o(s).cursorWidth)}),tt(i,c)}),M(m),ge(m,i=>q=i,()=>q),et(()=>{var i,c,u,p;ye(m,`${((i=o(s))==null?void 0:i.svgClass)??""} svelte-1h3d8ne`),f(m,"width",(c=o(s))==null?void 0:c.svgWidth),f(m,"height",(u=o(s))==null?void 0:u.svgHeight),f(m,"viewBox",`0 0 ${o(D)??""} ${o(A)??""}`),f(m,"stroke-width",(p=o(s))==null?void 0:p.strokeWidth),f(vt,"style",`fill: ${o(S)??""}; d: path('${o(it)??""}');`),f(vt,"stroke",o(S)),f($t,"style",`stroke: ${o(h)??""}; d: path('${o(st)??""}');`)}),fe("mouseleave",m,function(...i){var c;(c=o(R)?se:null)==null||c.apply(this,i)}),Wt(m,"clientWidth",i=>b(D,i)),Wt(m,"clientHeight",i=>b(A,i)),tt(e,m),Vt()}Kt(["mousemove","touchmove","touchend"]);const ze=`<div class="flex w-full flex-row p-4">
    <!-- Sparkline -->
    <div class="w-[30%]">
        <div style:height style:width>
            <Sparkline
                {data}
                options={{
                    interactive: true,
                    showTooltip: true,
                    lineColor: color,
                }}
                bind:cursorData={cursorInfo}
            />
        </div>

        <div class="flex flex-wrap gap-2 pt-4">
            <button
                class="btn btn-xs"
                onclick={() => (demoResponsiveness = true)}
                >Demo responsiveness</button
            >

            <button class="btn btn-xs" onclick={() => (period = 2000)}
                >Start updating</button
            >
            <button class="btn btn-xs" onclick={() => (period = 10)}
                >A tiny bit faster --thanks</button
            >

            <button class="btn btn-xs" onclick={() => (color = randomColor())}
                >Random color</button
            >
        </div>

        <div class="pl-10 pt-4 text-lg">
            Binding:
            {#if cursorInfo}
                <p>
                    {cursorInfo?.label}: {cursorInfo?.value}
                </p>
            {/if}
        </div>
    </div>

    <div class="w-[40%]">
        <div class="text-xs">
            <pre>{code}</pre>
        </div>
    </div>
</div>

<script lang="ts">
    import Sparkline from "$lib/Sparkline.svelte";
    import type { DataPoint } from "$lib/Sparkline.svelte";
    import code from "./+page.svelte?raw";

    let color = $state(randomColor());

    let height = $state("8em");
    let width = $state("25em");

    let demoResponsiveness = $state(false);

    let cursorInfo: DataPoint | null = $state(null);

    function randomColor() {
        return \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`;
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let monthIndex = 10;

    let data = $state(
        months.slice(0, 10).map((month) => ({
            label: month,
            value: Math.floor(Math.random() * 1000),
        })),
    );

    let period = $state(1000000);

    $effect(() => {
        const interval = setInterval(() => {
            const month = months[monthIndex % months.length];
            monthIndex++;

            data.push({
                label: month,
                value: Math.floor(Math.random() * 100),
            });
            data.shift();
        }, period);

        return () => clearInterval(interval);
    });

    $effect(() => {
        if (demoResponsiveness) {
            height = "2em";
            width = "7.5em";
        }
    });
<\/script>
`;var Pe=(e,t)=>b(t,!0),We=(e,t)=>b(t,2e3),je=(e,t)=>b(t,10),Fe=(e,t,n)=>b(t,Y(n())),Oe=qt("<p> </p>"),Xe=qt(`<div class="flex w-full flex-row p-4"><div class="w-[30%]"><div><!></div> <div class="flex flex-wrap gap-2 pt-4"><button class="btn btn-xs">Demo responsiveness</button> <button class="btn btn-xs">Start updating</button> <button class="btn btn-xs">A tiny bit faster --thanks</button> <button class="btn btn-xs">Random color</button></div> <div class="pl-10 pt-4 text-lg">Binding: <!></div></div> <div class="w-[40%]"><div class="text-xs"><pre>${_e(ze)}</pre></div></div></div>`);function Ye(e,t){Yt(t,!0);let n=I(Y(h())),r=I("8em"),s=I("25em"),a=I(!1),l=I(null);function h(){return`#${Math.floor(Math.random()*16777215).toString(16)}`}const S=["January","February","March","April","May","June","July","August","September","October","November","December"];let O=10,G=Y(S.slice(0,10).map(T=>({label:T,value:Math.floor(Math.random()*1e3)}))),K=I(1e6);xt(()=>{const T=setInterval(()=>{const X=S[O%S.length];O+=1,G.push({label:X,value:Math.floor(Math.random()*100)}),G.shift()},o(K));return()=>clearInterval(T)}),xt(()=>{o(a)&&(b(r,"2em"),b(s,"7.5em"))});var L=Xe(),R=C(L),E=C(R),D=C(E),A=d(()=>({interactive:!0,showTooltip:!0,lineColor:o(n)}));Te(D,{get data(){return G},get options(){return o(A)},get cursorData(){return o(l)},set cursorData(T){b(l,Y(T))}}),M(E);var x=z(E,2),st=C(x);st.__click=[Pe,a];var it=z(st,2);it.__click=[We,K];var $=z(it,2);$.__click=[je,K];var H=z($,2);H.__click=[Fe,n,h],M(x);var J=z(x,2),q=z(C(J));yt(q,()=>o(l),T=>{var X=Oe(),pt=C(X);M(X),et(()=>{var lt,ut;return Gt(pt,`${((lt=o(l))==null?void 0:lt.label)??""}: ${((ut=o(l))==null?void 0:ut.value)??""}`)}),tt(T,X)}),M(J),M(R);var g=z(R,2),at=C(g);C(at),M(at),M(g),M(L),et(()=>{Pt(E,"height",o(r)),Pt(E,"width",o(s))}),tt(e,L),Vt()}Kt(["click"]);export{Ye as component};
