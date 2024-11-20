var ie=Object.defineProperty;var Dt=e=>{throw TypeError(e)};var le=(e,t,n)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var zt=(e,t,n)=>le(e,typeof t!="symbol"?t+"":t,n),bt=(e,t,n)=>t.has(e)||Dt("Cannot "+n);var j=(e,t,n)=>(bt(e,t,"read from private field"),n?n.call(e):t.get(e)),U=(e,t,n)=>t.has(e)?Dt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),gt=(e,t,n,r)=>(bt(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),At=(e,t,n)=>(bt(e,t,"access private method"),n);import{n as $t,a as tt,t as qt}from"../chunks/disclose-version.Ch3PDx1e.js";import{x as Ht,h as ot,as as ue,at as ce,ae as ve,P as pe,l as de,p as Yt,k as yt,i as o,o as p,aq as I,D as b,v as T,s as C,f as he,t as et,e as Vt,w as M}from"../chunks/runtime.Cg5oSnlZ.js";import{a as Gt,e as fe,d as Kt}from"../chunks/store.DeU8N9Gq.js";import{p as be,a as Y,i as wt,b as ge}from"../chunks/props.D0SBms_E.js";const me=/[&<]/g;function _e(e,t){const n=String(e),r=me;r.lastIndex=0;let s="",i=0;for(;r.test(n);){const l=r.lastIndex-1,v=n[l];s+=n.substring(i,l)+(v==="&"?"&amp;":v==='"'?"&quot;":"&lt;"),i=l+1}return s+n.substring(i)}function h(e,t,n,r){var s=e.__attributes??(e.__attributes={});ot&&(s[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName==="LINK")||s[t]!==(s[t]=n)&&(t==="style"&&"__styles"in e&&(e.__styles={}),t==="loading"&&(e[ue]=n),n==null?e.removeAttribute(t):typeof n!="string"&&xe(e).includes(t)?e[t]=n:e.setAttribute(t,n))}var Tt=new Map;function xe(e){var t=Tt.get(e.nodeName);if(t)return t;Tt.set(e.nodeName,t=[]);for(var n,r=Ht(e),s=Element.prototype;s!==r;){n=ce(r);for(var i in n)n[i].set&&t.push(i);r=Ht(r)}return t}function ye(e,t){var n=e.__className,r=Zt(t);ot&&e.getAttribute("class")===r?e.__className=r:(n!==r||ot&&e.getAttribute("class")!==r)&&(r===""?e.removeAttribute("class"):e.setAttribute("class",r),e.__className=r)}function we(e,t){var n=e.__className,r=Zt(t);ot&&e.className===r?e.__className=r:(n!==r||ot&&e.className!==r)&&(t==null?e.removeAttribute("class"):e.className=r,e.__className=r)}function Zt(e){return e??""}function Pt(e,t,n,r){var s=e.__styles??(e.__styles={});s[t]!==n&&(s[t]=n,n==null?e.style.removeProperty(t):e.style.setProperty(t,n,""))}var B,V,rt,pt,Qt;const dt=class dt{constructor(t){U(this,pt);U(this,B,new WeakMap);U(this,V);U(this,rt);gt(this,rt,t)}observe(t,n){var r=j(this,B).get(t)||new Set;return r.add(n),j(this,B).set(t,r),At(this,pt,Qt).call(this).observe(t,j(this,rt)),()=>{var s=j(this,B).get(t);s.delete(n),s.size===0&&(j(this,B).delete(t),j(this,V).unobserve(t))}}};B=new WeakMap,V=new WeakMap,rt=new WeakMap,pt=new WeakSet,Qt=function(){return j(this,V)??gt(this,V,new ResizeObserver(t=>{for(var n of t){dt.entries.set(n.target,n);for(var r of j(this,B).get(n.target)||[])r(n)}}))},zt(dt,"entries",new WeakMap);let kt=dt;var Ut=new kt({box:"border-box"});function ke(e,t,n){var r=Ut,s=r.observe(e,i=>n(i[t]));ve(s)}function Wt(e,t,n){var r=Ut.observe(e,()=>n(e[t]));pe(()=>(de(()=>n(e[t])),r))}var $e={grad:.9,turn:360,rad:360/(2*Math.PI)},F=function(e){return typeof e=="string"?e.length>0:typeof e=="number"},f=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=Math.pow(10,t)),Math.round(n*e)/n+0},k=function(e,t,n){return t===void 0&&(t=0),n===void 0&&(n=1),e>n?n:e>t?e:t},te=function(e){return(e=isFinite(e)?e%360:0)>0?e:e+360},jt=function(e){return{r:k(e.r,0,255),g:k(e.g,0,255),b:k(e.b,0,255),a:k(e.a)}},mt=function(e){return{r:f(e.r),g:f(e.g),b:f(e.b),a:f(e.a,3)}},Ne=/^#([0-9a-f]{3,8})$/i,vt=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},ee=function(e){var t=e.r,n=e.g,r=e.b,s=e.a,i=Math.max(t,n,r),l=i-Math.min(t,n,r),v=l?i===t?(n-r)/l:i===n?2+(r-t)/l:4+(t-n)/l:0;return{h:60*(v<0?v+6:v),s:i?l/i*100:0,v:i/255*100,a:s}},ne=function(e){var t=e.h,n=e.s,r=e.v,s=e.a;t=t/360*6,n/=100,r/=100;var i=Math.floor(t),l=r*(1-n),v=r*(1-(t-i)*n),S=r*(1-(1-t+i)*n),O=i%6;return{r:255*[r,v,l,l,S,r][O],g:255*[S,r,r,v,l,l][O],b:255*[l,l,S,r,r,v][O],a:s}},Ft=function(e){return{h:te(e.h),s:k(e.s,0,100),l:k(e.l,0,100),a:k(e.a)}},Ot=function(e){return{h:f(e.h),s:f(e.s),l:f(e.l),a:f(e.a,3)}},Xt=function(e){return ne((n=(t=e).s,{h:t.h,s:(n*=((r=t.l)<50?r:100-r)/100)>0?2*n/(r+n)*100:0,v:r+n,a:t.a}));var t,n,r},nt=function(e){return{h:(t=ee(e)).h,s:(s=(200-(n=t.s))*(r=t.v)/100)>0&&s<200?n*r/100/(s<=100?s:200-s)*100:0,l:s/2,a:t.a};var t,n,r,s},Ce=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Me=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ie=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Se=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Bt={string:[[function(e){var t=Ne.exec(e);return t?(e=t[1]).length<=4?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?f(parseInt(e[3]+e[3],16)/255,2):1}:e.length===6||e.length===8?{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:e.length===8?f(parseInt(e.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(e){var t=Ie.exec(e)||Se.exec(e);return t?t[2]!==t[4]||t[4]!==t[6]?null:jt({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(e){var t=Ce.exec(e)||Me.exec(e);if(!t)return null;var n,r,s=Ft({h:(n=t[1],r=t[2],r===void 0&&(r="deg"),Number(n)*($e[r]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return Xt(s)},"hsl"]],object:[[function(e){var t=e.r,n=e.g,r=e.b,s=e.a,i=s===void 0?1:s;return F(t)&&F(n)&&F(r)?jt({r:Number(t),g:Number(n),b:Number(r),a:Number(i)}):null},"rgb"],[function(e){var t=e.h,n=e.s,r=e.l,s=e.a,i=s===void 0?1:s;if(!F(t)||!F(n)||!F(r))return null;var l=Ft({h:Number(t),s:Number(n),l:Number(r),a:Number(i)});return Xt(l)},"hsl"],[function(e){var t=e.h,n=e.s,r=e.v,s=e.a,i=s===void 0?1:s;if(!F(t)||!F(n)||!F(r))return null;var l=function(v){return{h:te(v.h),s:k(v.s,0,100),v:k(v.v,0,100),a:k(v.a)}}({h:Number(t),s:Number(n),v:Number(r),a:Number(i)});return ne(l)},"hsv"]]},Lt=function(e,t){for(var n=0;n<t.length;n++){var r=t[n][0](e);if(r)return[r,t[n][1]]}return[null,void 0]},Re=function(e){return typeof e=="string"?Lt(e.trim(),Bt.string):typeof e=="object"&&e!==null?Lt(e,Bt.object):[null,void 0]},_t=function(e,t){var n=nt(e);return{h:n.h,s:k(n.s+100*t,0,100),l:n.l,a:n.a}},xt=function(e){return(299*e.r+587*e.g+114*e.b)/1e3/255},Et=function(e,t){var n=nt(e);return{h:n.h,s:n.s,l:k(n.l+100*t,0,100),a:n.a}},Jt=function(){function e(t){this.parsed=Re(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return e.prototype.isValid=function(){return this.parsed!==null},e.prototype.brightness=function(){return f(xt(this.rgba),2)},e.prototype.isDark=function(){return xt(this.rgba)<.5},e.prototype.isLight=function(){return xt(this.rgba)>=.5},e.prototype.toHex=function(){return t=mt(this.rgba),n=t.r,r=t.g,s=t.b,l=(i=t.a)<1?vt(f(255*i)):"","#"+vt(n)+vt(r)+vt(s)+l;var t,n,r,s,i,l},e.prototype.toRgb=function(){return mt(this.rgba)},e.prototype.toRgbString=function(){return t=mt(this.rgba),n=t.r,r=t.g,s=t.b,(i=t.a)<1?"rgba("+n+", "+r+", "+s+", "+i+")":"rgb("+n+", "+r+", "+s+")";var t,n,r,s,i},e.prototype.toHsl=function(){return Ot(nt(this.rgba))},e.prototype.toHslString=function(){return t=Ot(nt(this.rgba)),n=t.h,r=t.s,s=t.l,(i=t.a)<1?"hsla("+n+", "+r+"%, "+s+"%, "+i+")":"hsl("+n+", "+r+"%, "+s+"%)";var t,n,r,s,i},e.prototype.toHsv=function(){return t=ee(this.rgba),{h:f(t.h),s:f(t.s),v:f(t.v),a:f(t.a,3)};var t},e.prototype.invert=function(){return w({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},e.prototype.saturate=function(t){return t===void 0&&(t=.1),w(_t(this.rgba,t))},e.prototype.desaturate=function(t){return t===void 0&&(t=.1),w(_t(this.rgba,-t))},e.prototype.grayscale=function(){return w(_t(this.rgba,-1))},e.prototype.lighten=function(t){return t===void 0&&(t=.1),w(Et(this.rgba,t))},e.prototype.darken=function(t){return t===void 0&&(t=.1),w(Et(this.rgba,-t))},e.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},e.prototype.alpha=function(t){return typeof t=="number"?w({r:(n=this.rgba).r,g:n.g,b:n.b,a:t}):f(this.rgba.a,3);var n},e.prototype.hue=function(t){var n=nt(this.rgba);return typeof t=="number"?w({h:t,s:n.s,l:n.l,a:n.a}):f(n.h)},e.prototype.isEqual=function(t){return this.toHex()===w(t).toHex()},e}(),w=function(e){return e instanceof Jt?e:new Jt(e)},De=$t('<foreignObject id="sparkline-tooltip-foreign-object"><div id="sparkline-tooltip-text"> </div></foreignObject>'),ze=$t('<line id="sparkline-cursor-line" y1="0"></line><!>',1),Ae=$t('<svg id="sparkline-svg" preserveAspectRatio="none" aria-hidden="true" role="img" style="fill: none; touch-action: none;"><path id="sparkline-fill-path" class="svelte-1bfcxmz"></path><path id="sparkline-line-path" fill="none" stroke-linecap="square" class="svelte-1bfcxmz"></path><!></svg>');function He(e,t){Yt(t,!0);let n=be(t,"cursorData",15,null);const r={svgWidth:"100%",svgHeight:"100%",strokeWidth:6,spotRadius:2,tooltipFontSize:"0.875rem",showTooltip:!0,cursorWidth:3};let s=p(()=>({...r,...t.options}));function i(a,c,u){return a=typeof a=="string"?w(a):a,a.isDark()!==u?a.darken(c):a.lighten(c)}const l=p(()=>{var y,P,W,Z,Q;const a=(y=o(s))!=null&&y.lineColor?w(o(s).lineColor):w("#FF476F"),c=((P=o(s))==null?void 0:P.fillColor)??i(a,.2,!1).toHex(),u=((W=o(s))==null?void 0:W.cursorColor)??i(a,.1,!0).toHex(),d=((Z=o(s))==null?void 0:Z.tooltipFillColor)??i(c,.1,!1).toHex(),N=((Q=o(s))==null?void 0:Q.tooltipTextColor)??i(d,.6,!0).toHex();return{lineColor:a.toHex(),fillColor:c,cursorColor:u,tooltipFillColor:d,tooltipTextColor:N}}),v=p(()=>o(l).lineColor),S=p(()=>o(l).fillColor),O=p(()=>o(l).cursorColor),G=p(()=>o(l).tooltipFillColor),K=p(()=>o(l).tooltipTextColor),L=p(()=>o(s).spotRadius*2),R=p(()=>{var a;return!!((a=o(s))!=null&&a.interactive)});let E=p(()=>Math.max(...t.data.map(a=>typeof a=="number"?a:a.value))),D=I(0),z=I(0),x=p(()=>{if(t.data.length<=1||o(D)===0||o(z)===0)return[];const a=o(D)-o(L)*2,c=o(z)-o(s).strokeWidth*2-o(L);return t.data.map((u,d)=>{const N=typeof u=="number"?u:u.value,_=typeof u=="number"?void 0:u.label;let y=d/(t.data.length-1)*a+o(L),P=o(z)-N/o(E)*c-(o(s).strokeWidth+o(s).spotRadius);return{x:y,y:P,value:N,label:_,index:d}})}),st=p(()=>o(x).length<=1?"":"M "+o(x).map(a=>`${a.x} ${a.y}`).join(" L ")),at=p(()=>o(x).length<=1?"":`${"M "+o(x).map(u=>({x:u.x,y:u.y+o(s).strokeWidth/2})).map(u=>`${u.x} ${u.y}`).join(" L ")} V ${o(z)} L ${o(x)[0].x} ${o(z)} Z`),$=I(null),A=I(!0),J=I(0),q,g=p(()=>{if(o(A)||!o(R)||!q)return null;const a=q.getBoundingClientRect(),u=(o(J)-a.left)/a.width*o(D);let d=o(x).find(W=>W.x>=u)??o(x)[o(x).length-1];const N=o(x).indexOf(d)-1,_=o(x)[N];let y,P;return _?(P=_.x+(d.x-_.x)/2,y=u>=P?d:_):y=d,y}),it=p(()=>o(A)||!o(g)?[0,0]:[o(g).x,o(g).y]),H=p(()=>o(it)[0]),X=p(()=>{if(o(A)||!o(g)||!o($))return[0,0];let a=o(g).x,c=o(g).y-o(s).spotRadius-10,u=a-o($)[0].inlineSize/2,d=c-o($)[0].blockSize;return u<0&&(u=0),u+o($)[0].inlineSize>o(D)&&(u=o(D)-o($)[0].inlineSize),d<0&&(d=0),[u,d]}),ht=p(()=>o(X)[0]),lt=p(()=>o(X)[1]);yt(()=>{o(g)!==null?n(o(g)):n(null)});function ut(a){b(A,!1),b(J,Y(a.clientX))}function oe(a){b(A,!1),b(J,Y(a.touches[0].clientX))}function re(a){b(A,!0)}function se(a){b(A,!0)}var m=Ae();m.__mousemove=function(...a){var c;(c=o(R)?ut:null)==null||c.apply(this,a)},m.__touchmove=function(...a){var c;(c=o(R)?oe:null)==null||c.apply(this,a)},m.__touchend=function(...a){var c;(c=o(R)?re:null)==null||c.apply(this,a)};var ct=C(m),ft=T(ct),ae=T(ft);wt(ae,()=>o(R)&&!o(A),a=>{var c=ze(),u=he(c),d=T(u);wt(d,()=>{var N;return(N=o(s))==null?void 0:N.showTooltip},N=>{var _=De(),y=C(_),P=C(y,!0);M(y),M(_),et(()=>{var W,Z,Q,Nt,Ct,Mt,It,St,Rt;h(_,"x",o(ht)),h(_,"y",o(lt)),h(_,"width",((Z=(W=o($))==null?void 0:W[0])==null?void 0:Z.inlineSize)??0),h(_,"height",((Nt=(Q=o($))==null?void 0:Q[0])==null?void 0:Nt.blockSize)??0),we(y,`${((Ct=o(s))==null?void 0:Ct.toolTipClass)??"tooltip-class"??""} tooltip-defaults svelte-1bfcxmz`),h(y,"style",` background-color: ${o(G)??""}; color: ${o(K)??""};  font-size: ${((Mt=o(s))==null?void 0:Mt.tooltipFontSize)??""}; border: 0rem solid ${o(v)??""}; max-width: ${o(D)??""}px;`),Gt(P,(It=o(g))!=null&&It.label?`${(St=o(g))==null?void 0:St.label}: ${o(g).value}`:`${(Rt=o(g))==null?void 0:Rt.value}`)}),ke(y,"borderBoxSize",W=>b($,W)),tt(N,_)}),et(()=>{h(u,"style",`stroke: ${o(O)??""};`),h(u,"x1",o(H)),h(u,"x2",o(H)),h(u,"y2",o(z)),h(u,"stroke-width",o(s).cursorWidth)}),tt(a,c)}),M(m),ge(m,a=>q=a,()=>q),et(()=>{var a,c,u,d;ye(m,`${((a=o(s))==null?void 0:a.svgClass)??""} svelte-1bfcxmz`),h(m,"width",(c=o(s))==null?void 0:c.svgWidth),h(m,"height",(u=o(s))==null?void 0:u.svgHeight),h(m,"viewBox",`0 0 ${o(D)??""} ${o(z)??""}`),h(m,"stroke-width",(d=o(s))==null?void 0:d.strokeWidth),h(ct,"style",`fill: ${o(S)??""};`),h(ct,"d",o(at)),h(ct,"stroke",o(S)),h(ft,"style",`stroke: ${o(v)??""};`),h(ft,"d",o(st))}),fe("mouseleave",m,function(...a){var c;(c=o(R)?se:null)==null||c.apply(this,a)}),Wt(m,"clientWidth",a=>b(D,a)),Wt(m,"clientHeight",a=>b(z,a)),tt(e,m),Vt()}Kt(["mousemove","touchmove","touchend"]);const Te=`<div class="flex w-full flex-row flex-wrap p-6">
    <!-- Sparkline -->
    <div class="flex-grow-[0.1] pb-4">
        <div class="max-w-[85vw]" style:height style:width>
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

        <div class="mb-10 h-4 text-lg">
            Binding:
            {#if cursorInfo}
                <p>
                    {cursorInfo?.label}: {cursorInfo?.value}
                </p>
            {/if}
        </div>
    </div>

    <div class="flex-grow-[0.7] pt-1">
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
`;var Pe=(e,t)=>b(t,!0),We=(e,t)=>b(t,2e3),je=(e,t)=>b(t,10),Fe=(e,t,n)=>b(t,Y(n())),Oe=qt("<p> </p>"),Xe=qt(`<div class="flex w-full flex-row flex-wrap p-6"><div class="flex-grow-[0.1] pb-4"><div class="max-w-[85vw]"><!></div> <div class="flex flex-wrap gap-2 pt-4"><button class="btn btn-xs">Demo responsiveness</button> <button class="btn btn-xs">Start updating</button> <button class="btn btn-xs">A tiny bit faster --thanks</button> <button class="btn btn-xs">Random color</button></div> <div class="mb-10 h-4 text-lg">Binding: <!></div></div> <div class="flex-grow-[0.7] pt-1"><div class="text-xs"><pre>${_e(Te)}</pre></div></div></div>`);function Ye(e,t){Yt(t,!0);let n=I(Y(v())),r=I("8em"),s=I("25em"),i=I(!1),l=I(null);function v(){return`#${Math.floor(Math.random()*16777215).toString(16)}`}const S=["January","February","March","April","May","June","July","August","September","October","November","December"];let O=10,G=Y(S.slice(0,10).map(H=>({label:H,value:Math.floor(Math.random()*1e3)}))),K=I(1e6);yt(()=>{const H=setInterval(()=>{const X=S[O%S.length];O+=1,G.push({label:X,value:Math.floor(Math.random()*100)}),G.shift()},o(K));return()=>clearInterval(H)}),yt(()=>{o(i)&&(b(r,"2em"),b(s,"7.5em"))});var L=Xe(),R=C(L),E=C(R),D=C(E),z=p(()=>({interactive:!0,showTooltip:!0,lineColor:o(n)}));He(D,{get data(){return G},get options(){return o(z)},get cursorData(){return o(l)},set cursorData(H){b(l,Y(H))}}),M(E);var x=T(E,2),st=C(x);st.__click=[Pe,i];var at=T(st,2);at.__click=[We,K];var $=T(at,2);$.__click=[je,K];var A=T($,2);A.__click=[Fe,n,v],M(x);var J=T(x,2),q=T(C(J));wt(q,()=>o(l),H=>{var X=Oe(),ht=C(X);M(X),et(()=>{var lt,ut;return Gt(ht,`${((lt=o(l))==null?void 0:lt.label)??""}: ${((ut=o(l))==null?void 0:ut.value)??""}`)}),tt(H,X)}),M(J),M(R);var g=T(R,2),it=C(g);C(it),M(it),M(g),M(L),et(()=>{Pt(E,"height",o(r)),Pt(E,"width",o(s))}),tt(e,L),Vt()}Kt(["click"]);export{Ye as component};
