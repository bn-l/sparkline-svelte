var ln=Object.defineProperty;var Dt=n=>{throw TypeError(n)};var un=(n,t,e)=>t in n?ln(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var At=(n,t,e)=>un(n,typeof t!="symbol"?t+"":t,e),ft=(n,t,e)=>t.has(n)||Dt("Cannot "+e);var O=(n,t,e)=>(ft(n,t,"read from private field"),e?e.call(n):t.get(n)),U=(n,t,e)=>t.has(n)?Dt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),bt=(n,t,e,r)=>(ft(n,t,"write to private field"),r?r.call(n,e):t.set(n,e),e),Tt=(n,t,e)=>(ft(n,t,"access private method"),e);import{n as wt,a as tt,t as qt}from"../chunks/disclose-version.Ch3PDx1e.js";import{x as zt,h as ot,as as cn,at as hn,ae as vn,P as dn,l as pn,p as Yt,k as xt,i as o,o as v,aq as I,D as f,v as H,s as C,f as fn,t as nt,e as Vt,w as M}from"../chunks/runtime.Cg5oSnlZ.js";import{a as Gt,e as bn,d as Kt}from"../chunks/store.DeU8N9Gq.js";import{p as gn,a as Y,i as yt,b as mn}from"../chunks/props.D0SBms_E.js";const _n=/[&<]/g;function xn(n,t){const e=String(n),r=_n;r.lastIndex=0;let s="",i=0;for(;r.test(e);){const l=r.lastIndex-1,h=e[l];s+=e.substring(i,l)+(h==="&"?"&amp;":h==='"'?"&quot;":"&lt;"),i=l+1}return s+e.substring(i)}function m(n,t,e,r){var s=n.__attributes??(n.__attributes={});ot&&(s[t]=n.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&n.nodeName==="LINK")||s[t]!==(s[t]=e)&&(t==="style"&&"__styles"in n&&(n.__styles={}),t==="loading"&&(n[cn]=e),e==null?n.removeAttribute(t):typeof e!="string"&&yn(n).includes(t)?n[t]=e:n.setAttribute(t,e))}var Ht=new Map;function yn(n){var t=Ht.get(n.nodeName);if(t)return t;Ht.set(n.nodeName,t=[]);for(var e,r=zt(n),s=Element.prototype;s!==r;){e=hn(r);for(var i in e)e[i].set&&t.push(i);r=zt(r)}return t}function kn(n,t){var e=n.__className,r=Zt(t);ot&&n.getAttribute("class")===r?n.__className=r:(e!==r||ot&&n.getAttribute("class")!==r)&&(r===""?n.removeAttribute("class"):n.setAttribute("class",r),n.__className=r)}function wn(n,t){var e=n.__className,r=Zt(t);ot&&n.className===r?n.__className=r:(e!==r||ot&&n.className!==r)&&(t==null?n.removeAttribute("class"):n.className=r,n.__className=r)}function Zt(n){return n??""}function Pt(n,t,e,r){var s=n.__styles??(n.__styles={});s[t]!==e&&(s[t]=e,e==null?n.style.removeProperty(t):n.style.setProperty(t,e,""))}var B,V,rt,ht,Qt;const vt=class vt{constructor(t){U(this,ht);U(this,B,new WeakMap);U(this,V);U(this,rt);bt(this,rt,t)}observe(t,e){var r=O(this,B).get(t)||new Set;return r.add(e),O(this,B).set(t,r),Tt(this,ht,Qt).call(this).observe(t,O(this,rt)),()=>{var s=O(this,B).get(t);s.delete(e),s.size===0&&(O(this,B).delete(t),O(this,V).unobserve(t))}}};B=new WeakMap,V=new WeakMap,rt=new WeakMap,ht=new WeakSet,Qt=function(){return O(this,V)??bt(this,V,new ResizeObserver(t=>{for(var e of t){vt.entries.set(e.target,e);for(var r of O(this,B).get(e.target)||[])r(e)}}))},At(vt,"entries",new WeakMap);let kt=vt;var Ut=new kt({box:"border-box"});function $n(n,t,e){var r=Ut,s=r.observe(n,i=>e(i[t]));vn(s)}function Ft(n,t,e){var r=Ut.observe(n,()=>e(n[t]));dn(()=>(pn(()=>e(n[t])),r))}var Nn={grad:.9,turn:360,rad:360/(2*Math.PI)},j=function(n){return typeof n=="string"?n.length>0:typeof n=="number"},d=function(n,t,e){return t===void 0&&(t=0),e===void 0&&(e=Math.pow(10,t)),Math.round(e*n)/e+0},w=function(n,t,e){return t===void 0&&(t=0),e===void 0&&(e=1),n>e?e:n>t?n:t},tn=function(n){return(n=isFinite(n)?n%360:0)>0?n:n+360},Ot=function(n){return{r:w(n.r,0,255),g:w(n.g,0,255),b:w(n.b,0,255),a:w(n.a)}},gt=function(n){return{r:d(n.r),g:d(n.g),b:d(n.b),a:d(n.a,3)}},Cn=/^#([0-9a-f]{3,8})$/i,ct=function(n){var t=n.toString(16);return t.length<2?"0"+t:t},nn=function(n){var t=n.r,e=n.g,r=n.b,s=n.a,i=Math.max(t,e,r),l=i-Math.min(t,e,r),h=l?i===t?(e-r)/l:i===e?2+(r-t)/l:4+(t-e)/l:0;return{h:60*(h<0?h+6:h),s:i?l/i*100:0,v:i/255*100,a:s}},en=function(n){var t=n.h,e=n.s,r=n.v,s=n.a;t=t/360*6,e/=100,r/=100;var i=Math.floor(t),l=r*(1-e),h=r*(1-(t-i)*e),S=r*(1-(1-t+i)*e),W=i%6;return{r:255*[r,h,l,l,S,r][W],g:255*[S,r,r,h,l,l][W],b:255*[l,l,S,r,r,h][W],a:s}},jt=function(n){return{h:tn(n.h),s:w(n.s,0,100),l:w(n.l,0,100),a:w(n.a)}},Wt=function(n){return{h:d(n.h),s:d(n.s),l:d(n.l),a:d(n.a,3)}},Xt=function(n){return en((e=(t=n).s,{h:t.h,s:(e*=((r=t.l)<50?r:100-r)/100)>0?2*e/(r+e)*100:0,v:r+e,a:t.a}));var t,e,r},et=function(n){return{h:(t=nn(n)).h,s:(s=(200-(e=t.s))*(r=t.v)/100)>0&&s<200?e*r/100/(s<=100?s:200-s)*100:0,l:s/2,a:t.a};var t,e,r,s},Mn=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,In=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Sn=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Rn=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Bt={string:[[function(n){var t=Cn.exec(n);return t?(n=t[1]).length<=4?{r:parseInt(n[0]+n[0],16),g:parseInt(n[1]+n[1],16),b:parseInt(n[2]+n[2],16),a:n.length===4?d(parseInt(n[3]+n[3],16)/255,2):1}:n.length===6||n.length===8?{r:parseInt(n.substr(0,2),16),g:parseInt(n.substr(2,2),16),b:parseInt(n.substr(4,2),16),a:n.length===8?d(parseInt(n.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(n){var t=Sn.exec(n)||Rn.exec(n);return t?t[2]!==t[4]||t[4]!==t[6]?null:Ot({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(n){var t=Mn.exec(n)||In.exec(n);if(!t)return null;var e,r,s=jt({h:(e=t[1],r=t[2],r===void 0&&(r="deg"),Number(e)*(Nn[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return Xt(s)},"hsl"]],object:[[function(n){var t=n.r,e=n.g,r=n.b,s=n.a,i=s===void 0?1:s;return j(t)&&j(e)&&j(r)?Ot({r:Number(t),g:Number(e),b:Number(r),a:Number(i)}):null},"rgb"],[function(n){var t=n.h,e=n.s,r=n.l,s=n.a,i=s===void 0?1:s;if(!j(t)||!j(e)||!j(r))return null;var l=jt({h:Number(t),s:Number(e),l:Number(r),a:Number(i)});return Xt(l)},"hsl"],[function(n){var t=n.h,e=n.s,r=n.v,s=n.a,i=s===void 0?1:s;if(!j(t)||!j(e)||!j(r))return null;var l=function(h){return{h:tn(h.h),s:w(h.s,0,100),v:w(h.v,0,100),a:w(h.a)}}({h:Number(t),s:Number(e),v:Number(r),a:Number(i)});return en(l)},"hsv"]]},Lt=function(n,t){for(var e=0;e<t.length;e++){var r=t[e][0](n);if(r)return[r,t[e][1]]}return[null,void 0]},Dn=function(n){return typeof n=="string"?Lt(n.trim(),Bt.string):typeof n=="object"&&n!==null?Lt(n,Bt.object):[null,void 0]},mt=function(n,t){var e=et(n);return{h:e.h,s:w(e.s+100*t,0,100),l:e.l,a:e.a}},_t=function(n){return(299*n.r+587*n.g+114*n.b)/1e3/255},Et=function(n,t){var e=et(n);return{h:e.h,s:e.s,l:w(e.l+100*t,0,100),a:e.a}},Jt=function(){function n(t){this.parsed=Dn(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return n.prototype.isValid=function(){return this.parsed!==null},n.prototype.brightness=function(){return d(_t(this.rgba),2)},n.prototype.isDark=function(){return _t(this.rgba)<.5},n.prototype.isLight=function(){return _t(this.rgba)>=.5},n.prototype.toHex=function(){return t=gt(this.rgba),e=t.r,r=t.g,s=t.b,l=(i=t.a)<1?ct(d(255*i)):"","#"+ct(e)+ct(r)+ct(s)+l;var t,e,r,s,i,l},n.prototype.toRgb=function(){return gt(this.rgba)},n.prototype.toRgbString=function(){return t=gt(this.rgba),e=t.r,r=t.g,s=t.b,(i=t.a)<1?"rgba("+e+", "+r+", "+s+", "+i+")":"rgb("+e+", "+r+", "+s+")";var t,e,r,s,i},n.prototype.toHsl=function(){return Wt(et(this.rgba))},n.prototype.toHslString=function(){return t=Wt(et(this.rgba)),e=t.h,r=t.s,s=t.l,(i=t.a)<1?"hsla("+e+", "+r+"%, "+s+"%, "+i+")":"hsl("+e+", "+r+"%, "+s+"%)";var t,e,r,s,i},n.prototype.toHsv=function(){return t=nn(this.rgba),{h:d(t.h),s:d(t.s),v:d(t.v),a:d(t.a,3)};var t},n.prototype.invert=function(){return k({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},n.prototype.saturate=function(t){return t===void 0&&(t=.1),k(mt(this.rgba,t))},n.prototype.desaturate=function(t){return t===void 0&&(t=.1),k(mt(this.rgba,-t))},n.prototype.grayscale=function(){return k(mt(this.rgba,-1))},n.prototype.lighten=function(t){return t===void 0&&(t=.1),k(Et(this.rgba,t))},n.prototype.darken=function(t){return t===void 0&&(t=.1),k(Et(this.rgba,-t))},n.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},n.prototype.alpha=function(t){return typeof t=="number"?k({r:(e=this.rgba).r,g:e.g,b:e.b,a:t}):d(this.rgba.a,3);var e},n.prototype.hue=function(t){var e=et(this.rgba);return typeof t=="number"?k({h:t,s:e.s,l:e.l,a:e.a}):d(e.h)},n.prototype.isEqual=function(t){return this.toHex()===k(t).toHex()},n}(),k=function(n){return n instanceof Jt?n:new Jt(n)},An=wt("<foreignObject><div> </div></foreignObject>"),Tn=wt('<line y1="0"></line><!>',1),zn=wt('<svg width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true" style="fill: none; touch-action: none;"><path class="svelte-n5tuka"></path><path fill="none" stroke-linecap="square" class="svelte-n5tuka"></path><!></svg>');function Hn(n,t){Yt(t,!0);let e=gn(t,"cursorData",15,null);const r={strokeWidth:6,spotRadius:2,tooltipFontSize:"0.875rem",showTooltip:!0,cursorWidth:3};let s=v(()=>({...r,...t.options}));function i(a,c,u){return a=typeof a=="string"?k(a):a,a.isDark()!==u?a.darken(c):a.lighten(c)}const l=v(()=>{var x,P,F,Z,Q;const a=(x=o(s))!=null&&x.lineColor?k(o(s).lineColor):k("#FF476F"),c=((P=o(s))==null?void 0:P.fillColor)??i(a,.2,!1).toHex(),u=((F=o(s))==null?void 0:F.cursorColor)??i(a,.1,!0).toHex(),p=((Z=o(s))==null?void 0:Z.tooltipFillColor)??i(c,.1,!1).toHex(),N=((Q=o(s))==null?void 0:Q.tooltipTextColor)??i(p,.6,!0).toHex();return{lineColor:a.toHex(),fillColor:c,cursorColor:u,tooltipFillColor:p,tooltipTextColor:N}}),h=v(()=>o(l).lineColor),S=v(()=>o(l).fillColor),W=v(()=>o(l).cursorColor),G=v(()=>o(l).tooltipFillColor),K=v(()=>o(l).tooltipTextColor),L=v(()=>o(s).spotRadius*2),R=v(()=>{var a;return!!((a=o(s))!=null&&a.interactive)});let E=v(()=>Math.max(...t.data.map(a=>typeof a=="number"?a:a.value))),D=I(0),A=I(0),_=v(()=>{if(t.data.length<=1||o(D)===0||o(A)===0)return[];const a=o(D)-o(L)*2,c=o(A)-o(s).strokeWidth*2-o(L);return t.data.map((u,p)=>{const N=typeof u=="number"?u:u.value,g=typeof u=="number"?String(u):u.label;let x=p/(t.data.length-1)*a+o(L),P=o(A)-N/o(E)*c-(o(s).strokeWidth+o(s).spotRadius);return{x,y:P,value:N,label:g,index:p}})}),st=v(()=>o(_).length<=1?"":"M "+o(_).map(a=>`${a.x} ${a.y}`).join(" L ")),at=v(()=>o(_).length<=1?"":`${"M "+o(_).map(u=>({x:u.x,y:u.y+o(s).strokeWidth/2})).map(u=>`${u.x} ${u.y}`).join(" L ")} V ${o(A)} L ${o(_)[0].x} ${o(A)} Z`),$=I(null),T=I(!0),J=I(0),q,b=v(()=>{if(o(T)||!o(R)||!q)return null;const a=q.getBoundingClientRect(),u=(o(J)-a.left)/a.width*o(D);let p=o(_).find(F=>F.x>=u)??o(_)[o(_).length-1];const N=o(_).indexOf(p)-1,g=o(_)[N];let x,P;return g?(P=g.x+(p.x-g.x)/2,x=u>=P?p:g):x=p,x}),it=v(()=>o(T)||!o(b)?[0,0]:[o(b).x,o(b).y]),z=v(()=>o(it)[0]),X=v(()=>{if(o(T)||!o(b)||!o($))return[0,0];let a=o(b).x,c=o(b).y-o(s).spotRadius-10,u=a-o($)[0].inlineSize/2,p=c-o($)[0].blockSize;return u<0&&(u=0),u+o($)[0].inlineSize>o(D)&&(u=o(D)-o($)[0].inlineSize),p<0&&(p=0),[u,p]}),dt=v(()=>o(X)[0]),lt=v(()=>o(X)[1]);xt(()=>{o(b)!==null?e(o(b)):e(null)});function ut(a){f(T,!1),f(J,Y(a.clientX))}function on(a){f(T,!1),f(J,Y(a.touches[0].clientX))}function rn(a){f(T,!0)}function sn(a){f(T,!0)}var y=zn();y.__mousemove=function(...a){var c;(c=o(R)?ut:null)==null||c.apply(this,a)},y.__touchmove=function(...a){var c;(c=o(R)?on:null)==null||c.apply(this,a)},y.__touchend=function(...a){var c;(c=o(R)?rn:null)==null||c.apply(this,a)};var pt=C(y),$t=H(pt),an=H($t);yt(an,()=>o(R)&&!o(T),a=>{var c=Tn(),u=fn(c),p=H(u);yt(p,()=>{var N;return(N=o(s))==null?void 0:N.showTooltip},N=>{var g=An(),x=C(g),P=C(x,!0);M(x),M(g),nt(()=>{var F,Z,Q,Nt,Ct,Mt,It,St,Rt;m(g,"x",o(dt)),m(g,"y",o(lt)),m(g,"width",((Z=(F=o($))==null?void 0:F[0])==null?void 0:Z.inlineSize)??0),m(g,"height",((Nt=(Q=o($))==null?void 0:Q[0])==null?void 0:Nt.blockSize)??0),wn(x,`${((Ct=o(s))==null?void 0:Ct.toolTipClass)??"tooltip-class"??""} svelte-n5tuka`),m(x,"style",`width: max-content; height: max-content; display: inline-flex; background-color: ${o(G)??""}; color: ${o(K)??""}; user-select: none; font-size: ${((Mt=o(s))==null?void 0:Mt.tooltipFontSize)??""}; border: 0rem solid ${o(h)??""}; max-width: ${o(D)??""}px;`),Gt(P,(It=o(b))!=null&&It.label?`${(St=o(b))==null?void 0:St.label}: ${o(b).value}`:`${(Rt=o(b))==null?void 0:Rt.value}`)}),$n(x,"borderBoxSize",F=>f($,F)),tt(N,g)}),nt(()=>{m(u,"style",`stroke: ${o(W)??""};`),m(u,"x1",o(z)),m(u,"x2",o(z)),m(u,"y2",o(A)),m(u,"stroke-width",o(s).cursorWidth)}),tt(a,c)}),M(y),mn(y,a=>q=a,()=>q),nt(()=>{var a,c;kn(y,`${((a=o(s))==null?void 0:a.svgClass)??""} svelte-n5tuka`),m(y,"viewBox",`0 0 ${o(D)??""} ${o(A)??""}`),m(y,"stroke-width",(c=o(s))==null?void 0:c.strokeWidth),m(pt,"style",`fill: ${o(S)??""}; d: path('${o(at)??""}');`),m(pt,"stroke",o(S)),m($t,"style",`stroke: ${o(h)??""}; d: path('${o(st)??""}');`)}),bn("mouseleave",y,function(...a){var c;(c=o(R)?sn:null)==null||c.apply(this,a)}),Ft(y,"clientWidth",a=>f(D,a)),Ft(y,"clientHeight",a=>f(A,a)),tt(n,y),Vt()}Kt(["mousemove","touchmove","touchend"]);const Pn=`<div class="flex w-full flex-row p-4">
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
`;var Fn=(n,t)=>f(t,!0),On=(n,t)=>f(t,2e3),jn=(n,t)=>f(t,10),Wn=(n,t,e)=>f(t,Y(e())),Xn=qt("<p> </p>"),Bn=qt(`<div class="flex w-full flex-row p-4"><div class="w-[30%]"><div><!></div> <div class="flex flex-wrap gap-2 pt-4"><button class="btn btn-xs">Demo responsiveness</button> <button class="btn btn-xs">Start updating</button> <button class="btn btn-xs">A tiny bit faster --thanks</button> <button class="btn btn-xs">Random color</button></div> <div class="pl-10 pt-4 text-lg">Binding: <!></div></div> <div class="w-[40%]"><div class="text-xs"><pre>${xn(Pn)}</pre></div></div></div>`);function Vn(n,t){Yt(t,!0);let e=I(Y(h())),r=I("8em"),s=I("25em"),i=I(!1),l=I(null);function h(){return`#${Math.floor(Math.random()*16777215).toString(16)}`}const S=["January","February","March","April","May","June","July","August","September","October","November","December"];let W=10,G=Y(S.slice(0,10).map(z=>({label:z,value:Math.floor(Math.random()*1e3)}))),K=I(1e6);xt(()=>{const z=setInterval(()=>{const X=S[W%S.length];W+=1,G.push({label:X,value:Math.floor(Math.random()*100)}),G.shift()},o(K));return()=>clearInterval(z)}),xt(()=>{o(i)&&(f(r,"2em"),f(s,"7.5em"))});var L=Bn(),R=C(L),E=C(R),D=C(E),A=v(()=>({interactive:!0,showTooltip:!0,lineColor:o(e)}));Hn(D,{get data(){return G},get options(){return o(A)},get cursorData(){return o(l)},set cursorData(z){f(l,Y(z))}}),M(E);var _=H(E,2),st=C(_);st.__click=[Fn,i];var at=H(st,2);at.__click=[On,K];var $=H(at,2);$.__click=[jn,K];var T=H($,2);T.__click=[Wn,e,h],M(_);var J=H(_,2),q=H(C(J));yt(q,()=>o(l),z=>{var X=Xn(),dt=C(X);M(X),nt(()=>{var lt,ut;return Gt(dt,`${((lt=o(l))==null?void 0:lt.label)??""}: ${((ut=o(l))==null?void 0:ut.value)??""}`)}),tt(z,X)}),M(J),M(R);var b=H(R,2),it=C(b);C(it),M(it),M(b),M(L),nt(()=>{Pt(E,"height",o(r)),Pt(E,"width",o(s))}),tt(n,L),Vt()}Kt(["click"]);export{Vn as component};
