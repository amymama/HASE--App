<template>
  <van-popup
    v-model="visible"
    position="right"
    :overlay="false"
    :style="{
      height: '100%',
      width: '100%',
    }"
  >
    <div class="flex-layout privacy-box">
      <div class="flex-layout__header">
        <van-nav-bar
          left-arrow
          @click-left="visible = false"
          title="PRIVACY STATEMENT"
        />
      </div>
      <div class="flex-layout__body privacy-box__inner">
        <div v-if="$t('lang') == 'en-US'" id="English">
          <div class="title">PRIVACY STATEMENT</div>
          <div>
            Protecting the personal privacy of every customer, vendor, and
            employee is a crucial part of gaining and keeping your trust in AQUA
            ELECTRICAL APPLIANCES VIETNAM CO., LTD (us). As a global operating
            organization, we strive to provide a high level of privacy
            protection across all of our businesses and services.
          </div>
          <div>
            This Privacy Statement (“Statement”) does not apply to third-party
            applications, products, services, websites or social media features
            that may be accessed through links that we provide on our Apps.
            Accessing those links may result in the collection of information
            about you by a third party. We do not control or endorse those
            third-party websites or their privacy practices. We encourage you to
            review the privacy policies of such third parties before interacting
            with them.
          </div>
          <div>
            Please read this Statement carefully. When using our services that
            link to or reference this Statement, you agree to be bound by the
            terms and conditions of this Statement.
          </div>
          <div class="sub-title">Your personal data – what is it?</div>
          <div>
            Personal data relates to a living individual who can be identified
            from that data. Identification can be by the data alone or in
            conjunction with any other data in the data controller’s possession
            or likely to come into such possession. The processing of your
            personal data is governed by applicable privacy laws.
          </div>
          <div class="sub-title">
            What roles do we play in processing your data?
          </div>
          <div>
            We are the data controller, data controller means a Person or a
            juristic person having the power and duties to make decisions
            regarding the collection, use, or disclosure of the Personal Data.
            This means that we decide how your personal data is processed and
            for what purposes. We know that you care how data about you is used
            and shared, and we appreciate your trust that we will do so
            carefully and sensibly.
          </div>
          <div class="sub-title">When are your personal data collected?</div>
          <div>Some of your data can, in particular, be collected by us:</div>
          <ul>
            <li>
              whenever you register to use our online services and become our
              customer;
            </li>
            <li>whenever you use our services and products;</li>
            <li>
              whenever you contact us via the various channels we offer you.
            </li>
          </ul>
          <div class="sub-title">Our collection of personal data</div>
          <div>
            The personal data we collect include any and all data you provide to
            us when you enter into contract with us, register an account with
            us, use our Apps or add information to your account, or give us in
            any other way. You can choose not to provide data to us, but we may
            then not be able to service you where such services require
            processing such data. We use the data that you provide for purposes
            administering your use of our services, such as communicating with
            you, responding to your requests, managing your account, customizing
            your service experience with us and improving our products and
            services. We may communicate with you by mail, email or telephone.
            We will send you strictly service-related announcements or
            information on rare occasions when it is necessary to do so.
          </div>
          <div>Examples of the data we collect and store include:</div>
          <div>
            When you register to be our user, we collect data you entered,
            including phone number, nation, photo, nick name, etc.
          </div>
          <div>When you use our Apps, we collect information including:</div>
          <ul>
            <li>
              Device information: hardware device Mac address, device
              information, device type, preference, etc.;
            </li>
            <li>
              Other personal information: device usage information, problem
              feedback, location, etc.
            </li>
          </ul>
          <div>
            We may also receive data about your location and your mobile device
            when you download our apps. This includes a unique identifier for
            your device. We may use this data to provide you with location-based
            personalized services. You can turn off location services on your
            device.
          </div>
          <div>
            All the data we collect from you may be stored as log files in our
            server or as augmented information associated with you or your
            devices. These log files are used for analysis, research, auditing,
            and other purposes. Your data is stored in log files until the data
            is transferred to backup databases or related texts. We routinely
            back-up a copy your data to prevent loss of your data in case of a
            server breakdown or human error. However, all such copies of your
            data in our backup database will be retained only for as long as our
            data retention policy permits (see “How long do we keep your
            personal data?” below), and will in any case be deleted immediately
            upon your request.
          </div>
          <div class="sub-title">How do we process your personal data?</div>
          <div>
            We comply with our obligations under applicable privacy laws by
            keeping personal data up to date; by storing and destroying it
            securely; by collecting and retaining only the necessary data that
            we need to service you; by protecting personal data from loss,
            misuse, unauthorized access and disclosure and by ensuring that
            appropriate technical measures are in place to protect personal
            data.
          </div>
          <div>
            The processing operations we perform on your data cover automated
            and non-automated means of collecting, recording, organizing,
            structuring, storing, altering, retrieving, using, transmitting,
            disseminating or otherwise making available, aligning or combining,
            restricting, and/or erasing your data.
          </div>
          <div>We use your personal data for the following purposes:</div>
          <ul>
            <li>To design and deliver our services and activities to you.</li>
            <li>
              To operate our Apps to provide you access to and use of our
              services.
            </li>
            <li>
              To provide services and products requested by you as described
              when we collect the information.
            </li>
            <li>
              To contact you to conduct research about your opinions of current
              services and products or of potential new services and products
              that may be offered by us.
            </li>
            <li>
              To share your contact details with our affiliate offices around
              the world within our group companies, for the purposes of internal
              administration and back-office support, to ensure our network
              security, and to prevent fraud.
            </li>
            <li>
              To maintain the integrity and safety of our data technology
              systems which store and process your personal data.
            </li>
            <li>
              To provide anonymous reporting for internal and external
              customers.
            </li>
            <li>
              To provide you with location based personalized services (such as
              leave and back home function).
            </li>
            <li>To enforce or defend our policies or contract with you.</li>
            <li>
              To detect and investigate data breaches, illegal activities, and
              fraud.
            </li>
          </ul>
          <div class="sub-title">
            What is our lawful basis for processing your personal data?
          </div>
          <div>
            In general, the lawful bases for us to process your personal data
            for the various types of processing performed on your data (please
            refer to “How do we process your personal data?” section of this
            Statement) is, as applicable, processing based on your consent, as
            necessary for us to enter into and to perform our contract with you,
            or as necessary to pursue the legitimate interest of our company or
            of third parties.
          </div>
          <div>
            We will collect, process and use the personal data supplied by you
            only for the purposes communicated to you and will not disclose your
            data to third parties except under the circumstances of data
            disclosure described in the “Sharing your personal data” section
            below.
          </div>
          <div>
            Where we talk about our legitimate interest or that of third
            parties, such legitimate interest can include:
          </div>
          <ul>
            <li>
              Implementation and operation of a group-wide organizational
              structure and group-wide information sharing;
            </li>
            <li>
              Right to freedom of expression or information, including in the
              media and the arts;
            </li>
            <li>
              Prevention of fraud, misuse of company IT systems, money
              laundering or any other activities required by the competent
              authorities;
            </li>
            <li>Operation of a whistleblowing scheme;</li>
            <li>Physical security, IT and network security;</li>
            <li>Internal investigations; and</li>
            <li>Proposed mergers and acquisitions.</li>
          </ul>
          <div class="sub-title">Necessity to provide us data</div>
          <div>
            You are not under any obligation to provide us any personal data. As
            noted below, the choice is yours. However, please note that without
            certain data from you, we may not able to undertake some or all of
            our obligations to you under our service contract with you, or
            adequately provide you with our full range of services. If you would
            like to obtain more detail about this, please contact us following
            the instructions in the “Whom should I contact” section below.
          </div>
          <div class="sub-title">Sharing your personal data</div>
          <div>
            Your personal data will be treated as strictly confidential, and
            will be shared only with the categories of data recipients listed
            below. We will only share your data with third parties outside of
            our company with your consent, and you will have an opportunity to
            choose for us not to share your data.
          </div>
          <div>We may disclose your personal data to:</div>
          <ul>
            <li>
              our affiliated entities within our global group of companies
              worldwide and authorized employee to provide you services such as
              facilitating order processing and shipping, for internal
              administration purposes, to detect and deal with data breaches,
              illegal activities, and fraud, and to maintain the integrity of
              our information technology systems.
            </li>
            <li>
              third party service providers whom we sub-contract to work on our
              behalf or for us and therefore may have access to your data only
              for purposes of performing these tasks on our behalf and under
              obligations similar to those described in this Statement, who
              perform functions such as data processing, auditing, order
              fulfillment, managing and enhancing customer data, providing
              customer service, conducting customer research or satisfaction
              surveys, logistics support, marketing support, payment processing
              and invoice collection support, informational systems technical
              support, to help us provide, analyze, and improve our services
              such as data storage, maintenance services, database management,
              web analytics, improvement of our service features, and to assist
              us in detecting and dealing with data breaches, illegal
              activities, and fraud.
            </li>
            <li>
              governments and/or government-affiliated institutions, courts, or
              law enforcement agencies, to comply with our obligations under
              relevant laws and regulations, enforce or defend our policies or
              contract with you, respond to claims, or in response to a verified
              request relating to a government or criminal investigation or
              suspected fraud or illegal activity that may expose us, you, or
              any other of our customers to legal liability; provided that, if
              any law enforcement agency requests your data, we will attempt to
              redirect the law enforcement agency to request that data directly
              from you, and in such event, we may provide your basic contact
              information to the law enforcement agency.
            </li>
            <li>
              third parties involved in a legal proceeding, if they provide us
              with a court order or substantially similar legal procedure
              requiring us to do so.
            </li>
          </ul>
          <div>
            We may provide you with opportunities to connect with third party
            applications or services. If you choose to use any such third party
            applications or services, we may facilitate sharing of your
            information with your consent. However, we do not control the
            applications or services of those third parties or how they use your
            information, and your use of such applications and services is not
            governed by this Statement. Please review the terms and the privacy
            policies of those third parties before using their applications or
            services.
          </div>
          <div>
            We will display your personal data and account activity in your
            profile page and elsewhere on our service portals according to the
            preferences you set in your account. You can review and revise your
            profile information at any time. Please consider carefully what
            information you disclose in your profile page and your desired level
            of anonymity. In your profile page, we will also display your device
            information as well as provide the network connection information
            for the devices to the applications that connect to your devices.
          </div>
          <div class="sub-title">How long do we keep your personal data?</div>
          <div>
            We keep your personal data for no longer than reasonably necessary
            for the given purpose for which your data is processed. If you will
            provide us, or have provided us, consent for us to process your
            data, we will process your data for no longer than your consent is
            effective. Notwithstanding the above, we may retain your personal
            data as required by applicable laws and regulations, as necessary to
            assist with any government and judicial investigations, to initiate
            or defend legal claims or for the purpose of civil, criminal or
            administrative proceedings. If none of the above grounds for us to
            keep your data apply, we will delete and dispose of your data in a
            secure manner according to our data protection policy.
          </div>
          <div class="sub-title">
            Privacy of data subjects have limited or no legal capacity
          </div>
          <div>
            Our products and services are not targeted to persons have limited
            or no legal capacity. We do not knowingly collect or process
            personal data from persons have limited or no legal capacity. Please
            note that if you are limited or no legal capacity, you will need to
            provide us a written signed consent from your parent or guardian
            indicating that your parent or guardian has consented for us to
            process your data and send us the consent through contact
            information provided from the section of “Whom should I contact?”
          </div>
          <div class="sub-title">Your rights and your personal data</div>
          <div>
            Unless subject to an exemption under applicable privacy laws, you
            have the following rights with respect to your personal data:
          </div>
          <ul>
            <li>
              The right to request that we correct any personal data if it is
              found to be inaccurate or out of date.
            </li>
            <li>
              The right to request to erase your personal data where it is no
              longer necessary for us to retain such data, except we are not
              obliged to do so if we need to retain such data in order to comply
              with a legal obligation or to establish, exercise or defend legal
              claims.
            </li>
            <li>
              The right to withdraw your consent to the processing at any time,
              if and where we rely on your consent to process your data. This
              includes cases where you wish to opt out from marketing
              communications that you receive from us.
            </li>
            <li>
              The right to restrict our processing of your personal data where
              you believe such data to be inaccurate, our processing is
              unlawful; or that we no longer need to process such data for a
              particular purpose unless we are not able to delete the data due
              to a legal or other obligation or because you do not wish for us
              to delete it.
            </li>
            <li>
              The right to object to us using your personal data, where the
              legal justification for our processing of your personal data is
              our legitimate interest. We will abide by your request unless we
              have compelling legitimate grounds for the processing which
              override your interests and rights, or if we need to continue to
              process the data for the establishment, exercise or defense of
              legal claims.
            </li>
            <li>
              The right to lodge a complaint regarding our processing of your
              data, with the competent authority where you reside or in which
              your data is processed.
            </li>
          </ul>
          <div>
            If you would like to exercise any of the above rights, please do so
            by providing your request to the contact window set forth in the
            “Whom should I contact” section.
          </div>
          <div>
            After receiving your request, we will evaluate your request and
            inform you how we intend to proceed on your request. Under certain
            circumstances in accordance with applicable privacy laws and
            regulations, we may withhold access to your data, or decline to
            modify, erase, or restrict the processing of your data.
          </div>
          <div>
            Please be advised that if you exercise the rights to erase data,
            restrict or object to our processing, or to withdraw your consent,
            we may not be able to continue our services to you if the necessary
            data is missing for processing.
          </div>
          <div class="sub-title">
            Transfer, Storage, and Processing of Data Abroad
          </div>
          <div>
            As noted in the “Sharing your personal data” section of this
            Statement, as a part of a globally operating company, we may share
            your information with our affiliate companies or third parties.
            Please refer to the “Sharing your personal data” section of this
            Statement for the recipients of your data and the reasons for our
            provision of your data to them. Where such entities are located in
            other countries and jurisdictions, we will therefore be transferring
            your personal data outside the country or jurisdiction where your
            personal data was collected. In making such data transfers, we make
            sure to protect your personal data by applying the level of security
            required by applicable privacy laws. Where we transfer your data to
            a country or jurisdiction that cannot guarantee the required level
            of protection as required by applicable privacy laws, we have
            enhanced our IT security measures to increase the protection of your
            personal data.
          </div>
          <div class="sub-title">Further processing</div>
          <div>
            If we wish to use your personal data for a new purpose not covered
            by this Statement, then we will provide you with a new notice
            explaining this new use prior to commencing such further processing
            for a new purpose, setting out the relevant new purpose and
            processing conditions. In such case, we will find a lawful basis for
            further processing, and whenever necessary we will seek your prior
            written consent to such further processing.
          </div>
          <div class="sub-title">Security</div>
          <div>
            We protect your data using technical measures to minimize the risks
            of misuse, unauthorized access, unauthorized disclosure, loss or
            theft, and loss of access. Some of the safeguards we use are data
            pseudonymization, data encryption, firewalls, and data access
            authorization controls. We take our data security very seriously.
            Therefore, the security mechanisms used to protect your data are
            checked and updated regularly to provide effective protection
            against abuse.
          </div>
          <div>
            The information we collect are usually encoded. Moreover, we have
            put in place additional and comprehensive state-of-the-art security
            measures when your data are accessed via the internet. Firewalls
            prevent unauthorized access. Diverse encryption and identification
            layers protect your data from intrusion or disclosure to third
            parties during data transfer. Moreover, an electronic identifier is
            generated during data transfer to safeguard your information.
          </div>
          <div>
            For your confidentiality and security, we use ID and password to
            secure your personal information. It is important for you to protect
            your ID, password, or any personal information. Do not disclose your
            personal information (especially password) to anyone. When you are
            finished using our services, please do not forget to log out from
            your account.
          </div>
          <div>
            Despite our best efforts, however, security cannot be absolutely
            guaranteed against all threats. If you believe that the security of
            your data has been compromised, or if you like more information on
            the measures we use to protect your data, please contact us
            following the instructions in the “Whom should I contact” section
            below.
          </div>
          <div class="sub-title">What are your choices?</div>
          <div>
            You have the choice to allow us to collect and process your data.
            The collection and processing of your personal data is neither a
            statutory nor a contractual requirement, although as noted above, we
            will be unable to provide you with certain services without the data
            necessary for such services purposes.
          </div>
          <div>
            You can always choose not to provide your data to us, although we
            may need such data to process your requests, in which case we will
            inform you of our constraints.
          </div>
          <div>
            To the extent that you have consented to our processing of your
            data, you can choose to discontinue our processing at any time.
          </div>
          <div>
            You can choose to add or update data that you have provided to us.
          </div>
          <div>
            You can choose to erase your data, or you may choose to restrict our
            processing of your data instead.
          </div>
          <div>You can choose to object to our processing of your data.</div>
          <div>
            Your choice or request on any aspects of data processing listed
            above can be communicated to us using the channels set forth in the
            “Whom should I contact” section of this Statement.
          </div>
          <div>
            In summary, what we are allowed to do with your data is, with
            limited exceptions under applicable privacy laws, up to you.
            However, in the event that you choose for us not to further process
            your data, such choice may affect the delivery of our obligations or
            services to you; in this situation, we will inform you of our
            constraints.
          </div>
          <div>Whom should I contact?</div>
          <div>
            If you have any question about this Statement, or if you would like
            to exercise any of your rights, or if you have any complaints that
            you would like to discuss with us, please in the first instance send
            us signed and dated request, together with a copy of your identity
            card. Please be as accurate as possible:
          </div>
          <div>by post to</div>
          <div>AQUA ELECTRICAL APPLIANCES VIETNAM CO., LTD</div>
          <div>
            Level 17, Sonatus Building – 15 Le Thanh Ton, Ben Nghe Ward,
            District 1, Ho Chi Minh City
          </div>
          <div>Or</div>
          <div>
            by e-mail to
            <a href="mailto:khoa.nguyendang@aquavietnam.vn"
              >khoa.nguyendang@aquavietnam.vn</a
            >
          </div>
        </div>
        <div v-else id="Other">
          <div class="title">PRIVACY STATEMENT</div>
          <div>
            Protecting the personal privacy of every customer, vendor, and
            employee is a crucial part of gaining and keeping your trust in AQUA
            ELECTRICAL APPLIANCES VIETNAM CO., LTD (us). As a global operating
            organization, we strive to provide a high level of privacy
            protection across all of our businesses and services.
          </div>
          <div>
            This Privacy Statement (“Statement”) does not apply to third-party
            applications, products, services, websites or social media features
            that may be accessed through links that we provide on our Apps.
            Accessing those links may result in the collection of information
            about you by a third party. We do not control or endorse those
            third-party websites or their privacy practices. We encourage you to
            review the privacy policies of such third parties before interacting
            with them.
          </div>
          <div>
            Please read this Statement carefully. When using our services that
            link to or reference this Statement, you agree to be bound by the
            terms and conditions of this Statement.
          </div>
          <div class="sub-title">Your personal data – what is it?</div>
          <div>
            Personal data relates to a living individual who can be identified
            from that data. Identification can be by the data alone or in
            conjunction with any other data in the data controller’s possession
            or likely to come into such possession. The processing of your
            personal data is governed by applicable privacy laws.
          </div>
          <div class="sub-title">
            What roles do we play in processing your data?
          </div>
          <div>
            We are the data controller, data controller means a Person or a
            juristic person having the power and duties to make decisions
            regarding the collection, use, or disclosure of the Personal Data.
            This means that we decide how your personal data is processed and
            for what purposes. We know that you care how data about you is used
            and shared, and we appreciate your trust that we will do so
            carefully and sensibly.
          </div>
          <div class="sub-title">When are your personal data collected?</div>
          <div>Some of your data can, in particular, be collected by us:</div>
          <ul>
            <li>
              whenever you register to use our online services and become our
              customer;
            </li>
            <li>whenever you use our services and products;</li>
            <li>
              whenever you contact us via the various channels we offer you.
            </li>
          </ul>
          <div class="sub-title">Our collection of personal data</div>
          <div>
            The personal data we collect include any and all data you provide to
            us when you enter into contract with us, register an account with
            us, use our Apps or add information to your account, or give us in
            any other way. You can choose not to provide data to us, but we may
            then not be able to service you where such services require
            processing such data. We use the data that you provide for purposes
            administering your use of our services, such as communicating with
            you, responding to your requests, managing your account, customizing
            your service experience with us and improving our products and
            services. We may communicate with you by mail, email or telephone.
            We will send you strictly service-related announcements or
            information on rare occasions when it is necessary to do so.
          </div>
          <div>Examples of the data we collect and store include:</div>
          <div>
            When you register to be our user, we collect data you entered,
            including phone number, nation, photo, nick name, etc.
          </div>
          <div>When you use our Apps, we collect information including:</div>
          <ul>
            <li>
              Device information: hardware device Mac address, device
              information, device type, preference, etc.;
            </li>
            <li>
              Other personal information: device usage information, problem
              feedback, location, etc.
            </li>
          </ul>
          <div>
            We may also receive data about your location and your mobile device
            when you download our apps. This includes a unique identifier for
            your device. We may use this data to provide you with location-based
            personalized services. You can turn off location services on your
            device.
          </div>
          <div>
            All the data we collect from you may be stored as log files in our
            server or as augmented information associated with you or your
            devices. These log files are used for analysis, research, auditing,
            and other purposes. Your data is stored in log files until the data
            is transferred to backup databases or related texts. We routinely
            back-up a copy your data to prevent loss of your data in case of a
            server breakdown or human error. However, all such copies of your
            data in our backup database will be retained only for as long as our
            data retention policy permits (see “How long do we keep your
            personal data?” below), and will in any case be deleted immediately
            upon your request.
          </div>
          <div class="sub-title">How do we process your personal data?</div>
          <div>
            We comply with our obligations under applicable privacy laws by
            keeping personal data up to date; by storing and destroying it
            securely; by collecting and retaining only the necessary data that
            we need to service you; by protecting personal data from loss,
            misuse, unauthorized access and disclosure and by ensuring that
            appropriate technical measures are in place to protect personal
            data.
          </div>
          <div>
            The processing operations we perform on your data cover automated
            and non-automated means of collecting, recording, organizing,
            structuring, storing, altering, retrieving, using, transmitting,
            disseminating or otherwise making available, aligning or combining,
            restricting, and/or erasing your data.
          </div>
          <div>We use your personal data for the following purposes:</div>
          <ul>
            <li>To design and deliver our services and activities to you.</li>
            <li>
              To operate our Apps to provide you access to and use of our
              services.
            </li>
            <li>
              To provide services and products requested by you as described
              when we collect the information.
            </li>
            <li>
              To contact you to conduct research about your opinions of current
              services and products or of potential new services and products
              that may be offered by us.
            </li>
            <li>
              To share your contact details with our affiliate offices around
              the world within our group companies, for the purposes of internal
              administration and back-office support, to ensure our network
              security, and to prevent fraud.
            </li>
            <li>
              To maintain the integrity and safety of our data technology
              systems which store and process your personal data.
            </li>
            <li>
              To provide anonymous reporting for internal and external
              customers.
            </li>
            <li>
              To provide you with location based personalized services (such as
              leave and back home function).
            </li>
            <li>To enforce or defend our policies or contract with you.</li>
            <li>
              To detect and investigate data breaches, illegal activities, and
              fraud.
            </li>
          </ul>
          <div class="sub-title">
            What is our lawful basis for processing your personal data?
          </div>
          <div>
            In general, the lawful bases for us to process your personal data
            for the various types of processing performed on your data (please
            refer to “How do we process your personal data?” section of this
            Statement) is, as applicable, processing based on your consent, as
            necessary for us to enter into and to perform our contract with you,
            or as necessary to pursue the legitimate interest of our company or
            of third parties.
          </div>
          <div>
            We will collect, process and use the personal data supplied by you
            only for the purposes communicated to you and will not disclose your
            data to third parties except under the circumstances of data
            disclosure described in the “Sharing your personal data” section
            below.
          </div>
          <div>
            Where we talk about our legitimate interest or that of third
            parties, such legitimate interest can include:
          </div>
          <ul>
            <li>
              Implementation and operation of a group-wide organizational
              structure and group-wide information sharing;
            </li>
            <li>
              Right to freedom of expression or information, including in the
              media and the arts;
            </li>
            <li>
              Prevention of fraud, misuse of company IT systems, money
              laundering or any other activities required by the competent
              authorities;
            </li>
            <li>Operation of a whistleblowing scheme;</li>
            <li>Physical security, IT and network security;</li>
            <li>Internal investigations; and</li>
            <li>Proposed mergers and acquisitions.</li>
          </ul>
          <div class="sub-title">Necessity to provide us data</div>
          <div>
            You are not under any obligation to provide us any personal data. As
            noted below, the choice is yours. However, please note that without
            certain data from you, we may not able to undertake some or all of
            our obligations to you under our service contract with you, or
            adequately provide you with our full range of services. If you would
            like to obtain more detail about this, please contact us following
            the instructions in the “Whom should I contact” section below.
          </div>
          <div class="sub-title">Sharing your personal data</div>
          <div>
            Your personal data will be treated as strictly confidential, and
            will be shared only with the categories of data recipients listed
            below. We will only share your data with third parties outside of
            our company with your consent, and you will have an opportunity to
            choose for us not to share your data.
          </div>
          <div>We may disclose your personal data to:</div>
          <ul>
            <li>
              our affiliated entities within our global group of companies
              worldwide and authorized employee to provide you services such as
              facilitating order processing and shipping, for internal
              administration purposes, to detect and deal with data breaches,
              illegal activities, and fraud, and to maintain the integrity of
              our information technology systems.
            </li>
            <li>
              third party service providers whom we sub-contract to work on our
              behalf or for us and therefore may have access to your data only
              for purposes of performing these tasks on our behalf and under
              obligations similar to those described in this Statement, who
              perform functions such as data processing, auditing, order
              fulfillment, managing and enhancing customer data, providing
              customer service, conducting customer research or satisfaction
              surveys, logistics support, marketing support, payment processing
              and invoice collection support, informational systems technical
              support, to help us provide, analyze, and improve our services
              such as data storage, maintenance services, database management,
              web analytics, improvement of our service features, and to assist
              us in detecting and dealing with data breaches, illegal
              activities, and fraud.
            </li>
            <li>
              governments and/or government-affiliated institutions, courts, or
              law enforcement agencies, to comply with our obligations under
              relevant laws and regulations, enforce or defend our policies or
              contract with you, respond to claims, or in response to a verified
              request relating to a government or criminal investigation or
              suspected fraud or illegal activity that may expose us, you, or
              any other of our customers to legal liability; provided that, if
              any law enforcement agency requests your data, we will attempt to
              redirect the law enforcement agency to request that data directly
              from you, and in such event, we may provide your basic contact
              information to the law enforcement agency.
            </li>
            <li>
              third parties involved in a legal proceeding, if they provide us
              with a court order or substantially similar legal procedure
              requiring us to do so.
            </li>
          </ul>
          <div>
            We may provide you with opportunities to connect with third party
            applications or services. If you choose to use any such third party
            applications or services, we may facilitate sharing of your
            information with your consent. However, we do not control the
            applications or services of those third parties or how they use your
            information, and your use of such applications and services is not
            governed by this Statement. Please review the terms and the privacy
            policies of those third parties before using their applications or
            services.
          </div>
          <div>
            We will display your personal data and account activity in your
            profile page and elsewhere on our service portals according to the
            preferences you set in your account. You can review and revise your
            profile information at any time. Please consider carefully what
            information you disclose in your profile page and your desired level
            of anonymity. In your profile page, we will also display your device
            information as well as provide the network connection information
            for the devices to the applications that connect to your devices.
          </div>
          <div class="sub-title">How long do we keep your personal data?</div>
          <div>
            We keep your personal data for no longer than reasonably necessary
            for the given purpose for which your data is processed. If you will
            provide us, or have provided us, consent for us to process your
            data, we will process your data for no longer than your consent is
            effective. Notwithstanding the above, we may retain your personal
            data as required by applicable laws and regulations, as necessary to
            assist with any government and judicial investigations, to initiate
            or defend legal claims or for the purpose of civil, criminal or
            administrative proceedings. If none of the above grounds for us to
            keep your data apply, we will delete and dispose of your data in a
            secure manner according to our data protection policy.
          </div>
          <div class="sub-title">
            Privacy of data subjects have limited or no legal capacity
          </div>
          <div>
            Our products and services are not targeted to persons have limited
            or no legal capacity. We do not knowingly collect or process
            personal data from persons have limited or no legal capacity. Please
            note that if you are limited or no legal capacity, you will need to
            provide us a written signed consent from your parent or guardian
            indicating that your parent or guardian has consented for us to
            process your data and send us the consent through contact
            information provided from the section of “Whom should I contact?”
          </div>
          <div class="sub-title">Your rights and your personal data</div>
          <div>
            Unless subject to an exemption under applicable privacy laws, you
            have the following rights with respect to your personal data:
          </div>
          <ul>
            <li>
              The right to request that we correct any personal data if it is
              found to be inaccurate or out of date.
            </li>
            <li>
              The right to request to erase your personal data where it is no
              longer necessary for us to retain such data, except we are not
              obliged to do so if we need to retain such data in order to comply
              with a legal obligation or to establish, exercise or defend legal
              claims.
            </li>
            <li>
              The right to withdraw your consent to the processing at any time,
              if and where we rely on your consent to process your data. This
              includes cases where you wish to opt out from marketing
              communications that you receive from us.
            </li>
            <li>
              The right to restrict our processing of your personal data where
              you believe such data to be inaccurate, our processing is
              unlawful; or that we no longer need to process such data for a
              particular purpose unless we are not able to delete the data due
              to a legal or other obligation or because you do not wish for us
              to delete it.
            </li>
            <li>
              The right to object to us using your personal data, where the
              legal justification for our processing of your personal data is
              our legitimate interest. We will abide by your request unless we
              have compelling legitimate grounds for the processing which
              override your interests and rights, or if we need to continue to
              process the data for the establishment, exercise or defense of
              legal claims.
            </li>
            <li>
              The right to lodge a complaint regarding our processing of your
              data, with the competent authority where you reside or in which
              your data is processed.
            </li>
          </ul>
          <div>
            If you would like to exercise any of the above rights, please do so
            by providing your request to the contact window set forth in the
            “Whom should I contact” section.
          </div>
          <div>
            After receiving your request, we will evaluate your request and
            inform you how we intend to proceed on your request. Under certain
            circumstances in accordance with applicable privacy laws and
            regulations, we may withhold access to your data, or decline to
            modify, erase, or restrict the processing of your data.
          </div>
          <div>
            Please be advised that if you exercise the rights to erase data,
            restrict or object to our processing, or to withdraw your consent,
            we may not be able to continue our services to you if the necessary
            data is missing for processing.
          </div>
          <div class="sub-title">
            Transfer, Storage, and Processing of Data Abroad
          </div>
          <div>
            As noted in the “Sharing your personal data” section of this
            Statement, as a part of a globally operating company, we may share
            your information with our affiliate companies or third parties.
            Please refer to the “Sharing your personal data” section of this
            Statement for the recipients of your data and the reasons for our
            provision of your data to them. Where such entities are located in
            other countries and jurisdictions, we will therefore be transferring
            your personal data outside the country or jurisdiction where your
            personal data was collected. In making such data transfers, we make
            sure to protect your personal data by applying the level of security
            required by applicable privacy laws. Where we transfer your data to
            a country or jurisdiction that cannot guarantee the required level
            of protection as required by applicable privacy laws, we have
            enhanced our IT security measures to increase the protection of your
            personal data.
          </div>
          <div class="sub-title">Further processing</div>
          <div>
            If we wish to use your personal data for a new purpose not covered
            by this Statement, then we will provide you with a new notice
            explaining this new use prior to commencing such further processing
            for a new purpose, setting out the relevant new purpose and
            processing conditions. In such case, we will find a lawful basis for
            further processing, and whenever necessary we will seek your prior
            written consent to such further processing.
          </div>
          <div class="sub-title">Security</div>
          <div>
            We protect your data using technical measures to minimize the risks
            of misuse, unauthorized access, unauthorized disclosure, loss or
            theft, and loss of access. Some of the safeguards we use are data
            pseudonymization, data encryption, firewalls, and data access
            authorization controls. We take our data security very seriously.
            Therefore, the security mechanisms used to protect your data are
            checked and updated regularly to provide effective protection
            against abuse.
          </div>
          <div>
            The information we collect are usually encoded. Moreover, we have
            put in place additional and comprehensive state-of-the-art security
            measures when your data are accessed via the internet. Firewalls
            prevent unauthorized access. Diverse encryption and identification
            layers protect your data from intrusion or disclosure to third
            parties during data transfer. Moreover, an electronic identifier is
            generated during data transfer to safeguard your information.
          </div>
          <div>
            For your confidentiality and security, we use ID and password to
            secure your personal information. It is important for you to protect
            your ID, password, or any personal information. Do not disclose your
            personal information (especially password) to anyone. When you are
            finished using our services, please do not forget to log out from
            your account.
          </div>
          <div>
            Despite our best efforts, however, security cannot be absolutely
            guaranteed against all threats. If you believe that the security of
            your data has been compromised, or if you like more information on
            the measures we use to protect your data, please contact us
            following the instructions in the “Whom should I contact” section
            below.
          </div>
          <div class="sub-title">What are your choices?</div>
          <div>
            You have the choice to allow us to collect and process your data.
            The collection and processing of your personal data is neither a
            statutory nor a contractual requirement, although as noted above, we
            will be unable to provide you with certain services without the data
            necessary for such services purposes.
          </div>
          <div>
            You can always choose not to provide your data to us, although we
            may need such data to process your requests, in which case we will
            inform you of our constraints.
          </div>
          <div>
            To the extent that you have consented to our processing of your
            data, you can choose to discontinue our processing at any time.
          </div>
          <div>
            You can choose to add or update data that you have provided to us.
          </div>
          <div>
            You can choose to erase your data, or you may choose to restrict our
            processing of your data instead.
          </div>
          <div>You can choose to object to our processing of your data.</div>
          <div>
            Your choice or request on any aspects of data processing listed
            above can be communicated to us using the channels set forth in the
            “Whom should I contact” section of this Statement.
          </div>
          <div>
            In summary, what we are allowed to do with your data is, with
            limited exceptions under applicable privacy laws, up to you.
            However, in the event that you choose for us not to further process
            your data, such choice may affect the delivery of our obligations or
            services to you; in this situation, we will inform you of our
            constraints.
          </div>
          <div>Whom should I contact?</div>
          <div>
            If you have any question about this Statement, or if you would like
            to exercise any of your rights, or if you have any complaints that
            you would like to discuss with us, please in the first instance send
            us signed and dated request, together with a copy of your identity
            card. Please be as accurate as possible:
          </div>
          <div>by post to</div>
          <div>AQUA ELECTRICAL APPLIANCES VIETNAM CO., LTD</div>
          <div>
            Level 17, Sonatus Building – 15 Le Thanh Ton, Ben Nghe Ward,
            District 1, Ho Chi Minh City
          </div>
          <div>Or</div>
          <div>
            by e-mail to
            <a href="mailto:khoa.nguyendang@aquavietnam.vn"
              >khoa.nguyendang@aquavietnam.vn</a
            >
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.privacy-box__inner {
  padding: 24px;
  color: #333;
  line-height: 150%;
  ul {
    padding-left: 32px;
  }
  li {
    list-style: disc;
  }
  .title {
    font-size: $font32;
    text-align: center;
    margin-bottom: 12px;
    font-weight: bold;
  }

  .sub-title{
    font-weight: bold;
    font-size: 26px;
  }
  div {
    padding-bottom: 12px;
  }
}
</style>
