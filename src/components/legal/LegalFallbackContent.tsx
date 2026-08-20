import Link from 'next/link'

import { getOperatorFromSettings } from '@/lib/legal-defaults'
import type { SettingsData } from '@/lib/types'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="font-display text-2xl text-[var(--color-charcoal)]">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-8 text-[var(--color-taupe)]">{children}</div>
    </section>
  )
}

export function ImprintLegalSections() {
  return (
    <>
      <Section title="Haftung für Inhalte">
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
          Als Diensteanbieter bin ich gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich.
        </p>
      </Section>

      <Section title="Haftung für Links">
        <p>
          Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss
          besteht. Deshalb kann für diese fremden Inhalte auch keine Gewähr übernommen werden. Für
          die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
          verantwortlich.
        </p>
      </Section>

      <Section title="Urheberrecht">
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und
          jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </Section>

      <Section title="Online-Streitbeilegung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>
    </>
  )
}

export function ImprintSupplementContent({ settings }: { settings: SettingsData | null }) {
  const operator = getOperatorFromSettings(settings)

  return (
    <>
      <Section title="Verantwortlich für den Inhalt">
        <p>
          {operator.name}
          <br />
          {operator.address}
          <br />
          E-Mail:{' '}
          <a href={`mailto:${operator.email}`} className="underline underline-offset-4">
            {operator.email}
          </a>
          <br />
          Telefon: {operator.phone}
        </p>
      </Section>

      <Section title="Berufsrechtliche Angaben">
        <p>{operator.profession}</p>
        <p>
          Es gelten die berufsrechtlichen Bestimmungen für Lebens- und Sozialberater:innen in
          Österreich. Weitere Informationen zu anwendbaren Vorschriften erhalten Sie auf Anfrage.
        </p>
      </Section>

      <ImprintLegalSections />
    </>
  )
}

export function PrivacyFallbackContent({ settings }: { settings: SettingsData | null }) {
  const operator = getOperatorFromSettings(settings)

  return (
    <>
      <Section title="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          {operator.name}
          <br />
          {operator.address}
          <br />
          E-Mail:{' '}
          <a href={`mailto:${operator.email}`} className="underline underline-offset-4">
            {operator.email}
          </a>
          <br />
          Telefon: {operator.phone}
        </p>
      </Section>

      <Section title="2. Allgemeine Hinweise">
        <p>
          Der Schutz Ihrer personenbezogenen Daten ist mir wichtig. Personenbezogene Daten sind
          alle Informationen, mit denen Sie persönlich identifiziert werden können. Diese
          Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung
          personenbezogener Daten auf dieser Website gemäß der Datenschutz-Grundverordnung (DSGVO)
          und dem österreichischen Datenschutzrecht.
        </p>
      </Section>

      <Section title="3. Hosting und Server-Logfiles">
        <p>
          Diese Website wird bei einem europäischen Hosting-Anbieter betrieben (z. B. Vercel Inc.).
          Beim Aufruf der Website werden automatisch technische Informationen erfasst, die Ihr
          Browser übermittelt (z. B. IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp,
          Betriebssystem, Referrer-URL).
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          einem sicheren und stabilen Betrieb der Website).
          <br />
          <strong>Speicherdauer:</strong> In der Regel wenige Tage bis maximal 30 Tage, sofern keine
          längere Aufbewahrung aus Sicherheitsgründen erforderlich ist.
        </p>
      </Section>

      <Section title="4. Content Management (Sanity)">
        <p>
          Inhalte dieser Website werden über Sanity.io (Sanity AS, Oslo, Norwegen) verwaltet. Beim
          Abruf von Texten und Bildern können technische Verbindungsdaten an Sanity übermittelt
          werden.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
          der Bereitstellung und Pflege der Website-Inhalte).
        </p>
      </Section>

      <Section title="5. Kontaktformular und E-Mail">
        <p>
          Wenn Sie mir über das Kontaktformular eine Nachricht senden, verarbeite ich die von Ihnen
          eingegebenen Daten (Name, E-Mail-Adresse, optional Telefon, Betreff, Nachricht) zur
          Bearbeitung Ihrer Anfrage.
        </p>
        <p>
          Der Versand erfolgt über einen E-Mail-Dienst (z. B. Resend). Die Daten werden nicht ohne
          Ihre Einwilligung an Dritte zu Werbezwecken weitergegeben.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen
          bzw. Anbahnung eines Vertrags) und Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über das
          Kontaktformular).
          <br />
          <strong>Speicherdauer:</strong> Ihre Anfrage wird gelöscht, sobald die Bearbeitung
          abgeschlossen ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen (in der
          Regel nach spätestens 3 Jahren).
        </p>
      </Section>

      <Section title="6. Cloudflare Turnstile (Spam-Schutz)">
        <p>
          Zum Schutz vor Missbrauch des Kontaktformulars kann Cloudflare Turnstile eingesetzt werden
          (Cloudflare, Inc., USA). Turnstile prüft, ob Eingaben durch eine natürliche Person oder
          automatisiert erfolgen. Dabei können IP-Adresse, Browserinformationen und
          Interaktionsdaten verarbeitet werden.
        </p>
        <p>
          Turnstile wird erst geladen, wenn Sie in den Cookie-Einstellungen funktionalen Cookies
          zustimmen. Ohne diese Einwilligung ist das Kontaktformular nicht nutzbar.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG
          (Einwilligung).
          <br />
          Weitere Informationen:{' '}
          <a
            href="https://www.cloudflare.com/de-de/privacypolicy/"
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Datenschutzerklärung
          </a>
        </p>
      </Section>

      <Section title="7. Cookies und Einwilligungsmanagement">
        <p>
          Diese Website verwendet Cookies und ähnliche Technologien. Notwendige Cookies sind für
          den Betrieb erforderlich (z. B. Speicherung Ihrer Cookie-Einstellungen). Funktionale
          Cookies (Cloudflare Turnstile) setzen wir nur mit Ihrer Einwilligung ein.
        </p>
        <p>Derzeit werden folgende Kategorien verwendet:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Notwendig:</strong> Speicherung Ihrer Cookie-Präferenzen (Cookie-Name:{' '}
            <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm">cookie_consent_v1</code>,
            Speicherdauer: 12 Monate).
          </li>
          <li>
            <strong>Funktional:</strong> Cloudflare Turnstile zum Spam-Schutz im Kontaktformular
            (nur nach Einwilligung).
          </li>
        </ul>
        <p>
          Sie können Ihre Einwilligung jederzeit über den Link „Cookie-Einstellungen“ im Footer
          dieser Website widerrufen bzw. anpassen.
        </p>
        <p>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG
          (Einwilligung) für nicht notwendige Cookies; Art. 6 Abs. 1 lit. f DSGVO für technisch
          notwendige Cookies.
        </p>
      </Section>

      <Section title="8. SSL-/TLS-Verschlüsselung">
        <p>
          Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine
          verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.
        </p>
      </Section>

      <Section title="9. Ihre Rechte">
        <p>Sie haben gegenüber mir folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
          <li>
            Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO) mit Wirkung für die
            Zukunft
          </li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte genügt eine Nachricht an{' '}
          <a href={`mailto:${operator.email}`} className="underline underline-offset-4">
            {operator.email}
          </a>
          .
        </p>
      </Section>

      <Section title="10. Beschwerderecht">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig
          in Österreich ist:
        </p>
        <p>
          Österreichische Datenschutzbehörde
          <br />
          Barichgasse 40–42, 1030 Wien
          <br />
          <a
            href="https://www.dsb.gv.at/"
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.dsb.gv.at
          </a>
        </p>
      </Section>

      <Section title="11. Aktualität">
        <p>
          Stand: Juli 2026. Ich behalte mir vor, diese Datenschutzerklärung anzupassen, damit sie
          stets den aktuellen rechtlichen Anforderungen entspricht oder Änderungen meiner
          Leistungen bzw. der eingesetzten Technologien berücksichtigt.
        </p>
      </Section>
    </>
  )
}
