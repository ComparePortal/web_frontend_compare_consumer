import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import OurTeam from '~/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/components/partials/page/about-us/AboutAwards';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';
import FooterSecond from '~/components/shared/footers/FooterSecond';

const AboutUsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'About Us',
        },
    ];
    return (
        <PageContainer
            footer={<FooterSecond classes="ps-footer--electronic" />}
            title="About Us">
            <div
                className="ps-page--single"
                style={{
                    width: '88%',
                    marginBottom: '150px',
                    marginLeft: '85',
                }}>
                <a target="_self" href="/page/about-us"></a>
                <BreadCrumb breacrumb={breadCrumb} />
                {/* 
   <OurTeam />
   <AboutAwards />
   */}
                <span
                    title="About yashraa– yashra.in"
                    class="aboutus-axwala"></span>
                <section class="Section-about-us" style={{ marginTop: '30px' }}>
                    <article>
                        <h2 id="about-axwala">About yashraa – yashra.in</h2>
                        <p>
                            To pursue the most ideal choice, having the real
                            factors at your fingertips is great. We are one of
                            the world's best cost and item correlation
                            administrations, with one single objective - to
                            direct purchasers to more brilliant purchasing
                            decisions. yashra.in is totally autonomous; we are
                            not claimed by or subject to any maker, retailer, or
                            other association that could have an interest in
                            giving one-sided data. yashraa's main goal is to
                            assist customers with tracking down better items and
                            better costs. Consistently we help countless
                            customers to track down better, less expensive items
                            and set aside cash by contrasting costs for a
                            specific item. Our vision is to be a free, solid
                            source the purchaser can continuously depend on when
                            they look at items on the web. We figure what we do
                            is truly invigorating - Web-based business is seeing
                            areas of strength and we need to assist customers
                            with pursuing more brilliant choices!
                        </p>

                        <h3 id="find-the-right-product">
                            Track down the right item
                        </h3>
                        <p>
                            We believe you should purchase the right item. That
                            is the reason we accumulate however many realities
                            as we can, and that is the reason we have created
                            one of the world's most far-reaching channels. Our
                            channel assists you with tracking down items that
                            suit your necessities.
                        </p>
                        <b style={{ fontSize: '15px' }}>
                            A colossal arrangement of items
                        </b>
                        <br />
                        <p></p>
                        <p>
                            Exhaustive channels - track down items that suit
                            you.
                        </p>
                        <p>
                            See what's well known - the most tapped-on items on
                            top of every category page Shop and item surveys,
                            composed by different clients
                        </p>

                        <h3 id="find-the-right-price">
                            Track down the right cost
                        </h3>
                        <p>
                            We believe that all purchasers should purchase at
                            the right cost. That is the reason we assemble costs
                            from all internet-based shops that we are aware of.
                            You can constantly believe that we show the most
                            reduced cost at the highest point of our item pages,
                            since no one can pay their direction to a higher
                            positioning in the cost list.
                        </p>
                        <p>
                            An enormous arrangement of costs from a colossal
                            arrangement of Indian online as well as offline
                            stores
                        </p>
                        <p>We show delivering expenses and stock status</p>
                        <p>
                            Cost history for each item - check whether the cost
                            is great at the present time
                        </p>
                        <p>Notifications when the cost drops</p>

                        <p>
                            Notifications when a shop gets a recently delivered
                            item in stock
                        </p>

                        <p>
                            Shop and item reviews, comment by different clients
                        </p>

                        <h3 id="even-more-advantages-with-our-free-membership">
                            Much more benefits to our free Membership Plan.
                        </h3>
                        <p>
                            If you use Yashra.in, consistently, we suggest that
                            you become a part of our free membership plan It's
                            free and it provides you with lots of benefits. For
                            example, it's more straightforward to screen cost
                            changes, and reviews, and save item records.
                        </p>
                        <p>
                            More straightforward to set up and change cost
                            alarms
                        </p>
                        <p>Save and sync your item records</p>
                        <p>write reviews on items</p>
                        <h3 id="download-our-app">Download our application</h3>
                        <p>
                            With our application on your mobile, you generally
                            have a strong buyer device in your pocket. Aside
                            from every one of the benefits we've recently
                            referenced, the applications likewise contain a
                            standardized identification scanner, so you can
                            check scanner tags in actual shops and look at the
                            costs.
                        </p>
                        <p>
                            <a href="./">Google Play</a>
                        </p>
                        <h3 id="we-are-free-and-always-on-your-side">
                            We are free and consistently your side
                        </h3>
                        <p>
                            For you as a shopper, it's allowed to utilize our
                            cost and item correlation administration. We don't
                            bring in cash by selling anything and don't maintain
                            that you should purchase more than whatever's
                            needed. Our central goal is to direct you to buy the
                            best when you have settled on one that brings in
                            cash by consenting to arrangements with shops, by
                            which we charge them each time you get coordinated
                            to their site. In any case, we generally show all
                            costs that we are aware of, and you can constantly
                            believe that we show them from the most minimal to
                            the most elevated. We generally construct our
                            administration around you, as a shopper.
                        </p>
                        <p>
                            The founders had a similar need to make great buys
                            and keep away from terrible ones, as you. At first,
                            the help comprised realities and costs of items that
                            they, when all is said and done, had intended to
                            purchase. Today, we are more than 100+ individuals
                            making progress toward giving you the most ideal
                            data before you settle on your buys.
                        </p>
                    </article>
                </section>
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};
export default AboutUsPage;
